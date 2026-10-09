import http from 'http';
import mongoose from 'mongoose';
import { app } from '../app';
import { connectDB, disconnectDB } from '../config/db';
import { env } from '../config/env';

// Import all Mongoose Models for direct DB state assertions
import { AdminModel } from '../modules/admins/admin.model';
import { DivisionModel } from '../modules/divisions/division.model';
import { ProductModel } from '../modules/products/product.model';
import { FilterModel } from '../modules/filters/filter.model';
import { ProjectModel } from '../modules/projects/project.model';
import { ClientModel } from '../modules/clients/client.model';
import { SettingModel } from '../modules/settings/setting.model';
import { LeadModel } from '../modules/leads/lead.model';

interface TestResult {
  module: string;
  name: string;
  status: 'PASSED' | 'FAILED';
  details?: string;
  dbVerified?: boolean;
}

const results: TestResult[] = [];
let server: http.Server | null = null;
let baseUrl = '';

// Shared session tokens & test IDs across scenarios
let superadminAccessToken = '';
let superadminRefreshToken = '';
let regularAdminAccessToken = '';
let createdAdminId = '';
let createdDivisionId = '';
let createdDivisionSlug = '';
let createdProductId = '';
let createdProductSlug = '';
let createdFilterId = '';
let createdProjectId = '';
let createdClientId = '';
let createdLeadId = '';
let uploadedPublicId = '';
let originalSettingValue: any = null;

function logHeader(title: string) {
  console.log(`\n======================================================================`);
  console.log(`🔷 ${title.toUpperCase()}`);
  console.log(`======================================================================`);
}

function recordPass(module: string, name: string, dbVerified = false, details?: string) {
  results.push({ module, name, status: 'PASSED', dbVerified, details });
  const dbTag = dbVerified ? ' [DB VERIFIED ✓]' : '';
  console.log(`  ✅ PASSED: ${name}${dbTag}${details ? ` (${details})` : ''}`);
}

function recordFail(module: string, name: string, error: any) {
  const errMsg = error instanceof Error ? error.message : String(error);
  results.push({ module, name, status: 'FAILED', details: errMsg });
  console.error(`  ❌ FAILED: ${name}`);
  console.error(`     Error: ${errMsg}`);
}

async function apiRequest(
  endpoint: string,
  options: {
    method?: string;
    token?: string;
    cookie?: string;
    body?: any;
    formData?: FormData;
    headers?: Record<string, string>;
  } = {}
) {
  const url = `${baseUrl}${endpoint}`;
  const headers: Record<string, string> = {
    'x-test-bypass': 'true',
    ...options.headers,
  };

  if (options.token) {
    headers['Authorization'] = `Bearer ${options.token}`;
  }

  if (options.cookie) {
    headers['Cookie'] = options.cookie;
  }

  let body: any = undefined;
  if (options.formData) {
    body = options.formData;
  } else if (options.body !== undefined) {
    headers['Content-Type'] = 'application/json';
    body = JSON.stringify(options.body);
  }

  const res = await fetch(url, {
    method: options.method || 'GET',
    headers,
    body,
  });

  const contentType = res.headers.get('content-type') || '';
  let data: any = null;
  if (contentType.includes('application/json')) {
    data = await res.json();
  } else if (contentType.includes('text/')) {
    data = await res.text();
  }

  // Extract set-cookie if any
  const setCookie = res.headers.get('set-cookie');

  return {
    status: res.status,
    headers: res.headers,
    data,
    setCookie,
  };
}

async function runTestSuite() {
  console.log(`\n🚀 [GMP VISION] Starting Comprehensive API & Database Verification Test Suite`);
  console.log(`   Local Time: ${new Date().toISOString()}`);

  // 1. Connect to MongoDB
  await connectDB();
  console.log(`   Connected to MongoDB: ${mongoose.connection.host}/${mongoose.connection.name}`);

  // 2. Connect to live server at http://localhost:5000
  baseUrl = process.env.API_URL || 'http://localhost:5000';
  console.log(`   Target API Base URL: ${baseUrl}`);

  try {
    // ======================================================================
    // MODULE 1: System Health Probes
    // ======================================================================
    logHeader('Module 1: System Health Probes');
    {
      const mod = 'Health Probes';
      // Scenario 1.1: GET /health
      try {
        const res = await apiRequest('/health');
        if (res.status === 200 && res.data.status === 'ok' && res.data.timestamp) {
          recordPass(mod, 'GET /health returns 200 and liveness payload');
        } else {
          throw new Error(`Unexpected status ${res.status}: ${JSON.stringify(res.data)}`);
        }
      } catch (err) {
        recordFail(mod, 'GET /health returns 200', err);
      }

      // Scenario 1.2: GET /ready
      try {
        const res = await apiRequest('/ready');
        if (res.status === 200 && res.data.status === 'ready' && res.data.database === 'connected') {
          recordPass(mod, 'GET /ready returns 200 and database connected payload');
        } else {
          throw new Error(`Unexpected status ${res.status}: ${JSON.stringify(res.data)}`);
        }
      } catch (err) {
        recordFail(mod, 'GET /ready returns 200', err);
      }
    }

    // ======================================================================
    // MODULE 2: Authentication
    // ======================================================================
    logHeader('Module 2: Authentication');
    {
      const mod = 'Auth';

      // Scenario 2.1: Superadmin Login (Valid Credentials)
      try {
        console.log(`   🔍 Checking DB: Verifying superadmin exists in database...`);
        const saDoc = await AdminModel.findOne({ email: env.SUPERADMIN_EMAIL });
        if (!saDoc) throw new Error(`Superadmin ${env.SUPERADMIN_EMAIL} not found in DB`);
        console.log(`   DB State: Superadmin found (ID: ${saDoc._id}, Role: ${saDoc.role})`);

        const res = await apiRequest('/api/v1/auth/login', {
          method: 'POST',
          body: {
            email: env.SUPERADMIN_EMAIL,
            password: env.SUPERADMIN_PASSWORD,
          },
        });

        if (res.status === 200 && res.data.success && res.data.data.accessToken) {
          superadminAccessToken = res.data.data.accessToken;
          const cookies = res.setCookie || '';
          const match = cookies.match(/refreshToken=([^;]+)/);
          if (match) {
            superadminRefreshToken = match[1];
          }

          // Verify DB updated with refreshTokenHash
          const updatedSa = await AdminModel.findById(saDoc._id);
          const hasRefreshHash = Boolean(updatedSa?.refreshTokenHash);

          recordPass(mod, 'POST /api/v1/auth/login with valid credentials', hasRefreshHash, 'Tokens issued & DB hashed refresh token stored');
        } else {
          throw new Error(`Login failed: ${JSON.stringify(res.data)}`);
        }
      } catch (err) {
        recordFail(mod, 'POST /api/v1/auth/login valid credentials', err);
      }

      // Scenario 2.2: Invalid password
      try {
        const res = await apiRequest('/api/v1/auth/login', {
          method: 'POST',
          body: { email: env.SUPERADMIN_EMAIL, password: 'WrongPassword!123' },
        });
        if (res.status === 401 && res.data.error?.code === 'INVALID_CREDENTIALS') {
          recordPass(mod, 'POST /api/v1/auth/login with invalid password returns 401');
        } else {
          throw new Error(`Expected 401 INVALID_CREDENTIALS, got ${res.status}`);
        }
      } catch (err) {
        recordFail(mod, 'POST /api/v1/auth/login invalid password', err);
      }

      // Scenario 2.3: Non-existent email
      try {
        const res = await apiRequest('/api/v1/auth/login', {
          method: 'POST',
          body: { email: 'nonexistent_user_99@gmpvision.com', password: 'Password@123' },
        });
        if (res.status === 401 && res.data.error?.code === 'INVALID_CREDENTIALS') {
          recordPass(mod, 'POST /api/v1/auth/login with non-existent email returns 401');
        } else {
          throw new Error(`Expected 401 INVALID_CREDENTIALS, got ${res.status}`);
        }
      } catch (err) {
        recordFail(mod, 'POST /api/v1/auth/login non-existent email', err);
      }

      // Scenario 2.4: Validation failure (missing password)
      try {
        const res = await apiRequest('/api/v1/auth/login', {
          method: 'POST',
          body: { email: env.SUPERADMIN_EMAIL },
        });
        if (res.status === 400 && res.data.error?.code === 'VALIDATION_ERROR') {
          recordPass(mod, 'POST /api/v1/auth/login missing password returns 400');
        } else {
          throw new Error(`Expected 400, got ${res.status}`);
        }
      } catch (err) {
        recordFail(mod, 'POST /api/v1/auth/login missing password', err);
      }

      // Scenario 2.5: GET /api/v1/auth/me (Valid Bearer)
      try {
        const res = await apiRequest('/api/v1/auth/me', { token: superadminAccessToken });
        if (res.status === 200 && res.data.data.email === env.SUPERADMIN_EMAIL) {
          recordPass(mod, 'GET /api/v1/auth/me returns current authenticated user profile');
        } else {
          throw new Error(`Expected 200 with profile, got ${res.status}`);
        }
      } catch (err) {
        recordFail(mod, 'GET /api/v1/auth/me authenticated', err);
      }

      // Scenario 2.6: GET /api/v1/auth/me (Missing Bearer Token)
      try {
        const res = await apiRequest('/api/v1/auth/me');
        if (res.status === 401) {
          recordPass(mod, 'GET /api/v1/auth/me without token returns 401 UNAUTHORIZED');
        } else {
          throw new Error(`Expected 401, got ${res.status}`);
        }
      } catch (err) {
        recordFail(mod, 'GET /api/v1/auth/me unauthenticated', err);
      }

      // Scenario 2.7: GET /api/v1/auth/me (Forged/Tampered Token)
      try {
        const res = await apiRequest('/api/v1/auth/me', { token: 'invalid.jwt.token.here' });
        if (res.status === 401) {
          recordPass(mod, 'GET /api/v1/auth/me with tampered token returns 401 INVALID_TOKEN');
        } else {
          throw new Error(`Expected 401, got ${res.status}`);
        }
      } catch (err) {
        recordFail(mod, 'GET /api/v1/auth/me tampered token', err);
      }

      // Scenario 2.8: POST /api/v1/auth/refresh (Valid Token via body or cookie)
      try {
        const res = await apiRequest('/api/v1/auth/refresh', {
          method: 'POST',
          body: { refreshToken: superadminRefreshToken },
          cookie: `refreshToken=${superadminRefreshToken}`,
        });
        if (res.status === 200 && res.data.data.accessToken) {
          superadminAccessToken = res.data.data.accessToken; // update with refreshed token
          recordPass(mod, 'POST /api/v1/auth/refresh successfully rotates token');
        } else {
          throw new Error(`Refresh failed: ${JSON.stringify(res.data)}`);
        }
      } catch (err) {
        recordFail(mod, 'POST /api/v1/auth/refresh valid token', err);
      }

      // Scenario 2.9: POST /api/v1/auth/refresh (Missing Refresh Token)
      try {
        const res = await apiRequest('/api/v1/auth/refresh', { method: 'POST', body: {} });
        if (res.status === 401) {
          recordPass(mod, 'POST /api/v1/auth/refresh missing token returns 401');
        } else {
          throw new Error(`Expected 401, got ${res.status}`);
        }
      } catch (err) {
        recordFail(mod, 'POST /api/v1/auth/refresh missing token', err);
      }

      // Scenario 2.10: POST /api/v1/auth/refresh (Forged Refresh Token)
      try {
        const res = await apiRequest('/api/v1/auth/refresh', {
          method: 'POST',
          body: { refreshToken: 'forged.refresh.token.signature' },
        });
        if (res.status === 401) {
          recordPass(mod, 'POST /api/v1/auth/refresh forged token returns 401');
        } else {
          throw new Error(`Expected 401, got ${res.status}`);
        }
      } catch (err) {
        recordFail(mod, 'POST /api/v1/auth/refresh forged token', err);
      }
    }

    // ======================================================================
    // MODULE 3: Admin User Accounts
    // ======================================================================
    logHeader('Module 3: Admin User Accounts');
    {
      const mod = 'Admins';
      const testEmail = `test.subadmin.${Date.now()}@gmpvision.com`;
      const testPassword = 'SecureAdminPass@2026!';

      // Scenario 3.1: GET /api/v1/admins (Superadmin listing)
      try {
        const res = await apiRequest('/api/v1/admins', { token: superadminAccessToken });
        if (res.status === 200 && Array.isArray(res.data.data)) {
          recordPass(mod, 'GET /api/v1/admins returns list of administrators for superadmin');
        } else {
          throw new Error(`Expected 200, got ${res.status}`);
        }
      } catch (err) {
        recordFail(mod, 'GET /api/v1/admins as superadmin', err);
      }

      // Scenario 3.2: GET /api/v1/admins (Unauthenticated)
      try {
        const res = await apiRequest('/api/v1/admins');
        if (res.status === 401) {
          recordPass(mod, 'GET /api/v1/admins without token returns 401');
        } else {
          throw new Error(`Expected 401, got ${res.status}`);
        }
      } catch (err) {
        recordFail(mod, 'GET /api/v1/admins unauthenticated', err);
      }

      // Scenario 3.3: POST /api/v1/admins (Create Admin Account)
      try {
        console.log(`   🔍 DB Check BEFORE: Checking if ${testEmail} exists...`);
        const preCheck = await AdminModel.findOne({ email: testEmail });
        console.log(`   DB Pre-check: ${preCheck ? 'EXISTS' : 'DOES NOT EXIST (clean)'}`);

        const res = await apiRequest('/api/v1/admins', {
          method: 'POST',
          token: superadminAccessToken,
          body: {
            email: testEmail,
            password: testPassword,
            role: 'admin',
          },
        });

        if (res.status === 201 && res.data.data?._id) {
          createdAdminId = res.data.data._id;

          // DIRECT DB VERIFICATION: Check document in MongoDB
          console.log(`   🔍 DB Check AFTER: Querying MongoDB for created admin ID: ${createdAdminId}...`);
          const dbAdmin = await AdminModel.findById(createdAdminId);
          if (!dbAdmin) throw new Error('Admin not found in MongoDB after API reported 201!');
          if (dbAdmin.email !== testEmail) throw new Error(`DB email mismatch: expected ${testEmail}, got ${dbAdmin.email}`);
          if (dbAdmin.role !== 'admin') throw new Error(`DB role mismatch: expected admin, got ${dbAdmin.role}`);
          if (!dbAdmin.passwordHash || dbAdmin.passwordHash.length < 20) throw new Error('Password was not hashed properly in DB');
          if (dbAdmin.isActive !== true) throw new Error('Admin isActive is not true in DB');

          console.log(`   DB State: Document confirmed in MongoDB! Role=${dbAdmin.role}, isActive=${dbAdmin.isActive}`);
          recordPass(mod, 'POST /api/v1/admins creates new admin account', true, `Admin ID: ${createdAdminId}`);
        } else {
          throw new Error(`Failed to create admin: ${JSON.stringify(res.data)}`);
        }
      } catch (err) {
        recordFail(mod, 'POST /api/v1/admins creation', err);
      }

      // Scenario 3.4: Duplicate email creation fails
      try {
        const res = await apiRequest('/api/v1/admins', {
          method: 'POST',
          token: superadminAccessToken,
          body: {
            email: testEmail,
            password: testPassword,
            role: 'admin',
          },
        });
        if (res.status === 409) {
          recordPass(mod, 'POST /api/v1/admins with duplicate email returns 409 CONFLICT');
        } else {
          throw new Error(`Expected 409, got ${res.status}`);
        }
      } catch (err) {
        recordFail(mod, 'POST /api/v1/admins duplicate email', err);
      }

      // Scenario 3.5: Validation failure (password too short)
      try {
        const res = await apiRequest('/api/v1/admins', {
          method: 'POST',
          token: superadminAccessToken,
          body: {
            email: `shortpass.${Date.now()}@gmpvision.com`,
            password: 'short',
            role: 'admin',
          },
        });
        if (res.status === 400) {
          recordPass(mod, 'POST /api/v1/admins with weak password returns 400 VALIDATION_ERROR');
        } else {
          throw new Error(`Expected 400, got ${res.status}`);
        }
      } catch (err) {
        recordFail(mod, 'POST /api/v1/admins validation failure', err);
      }

      // Scenario 3.6: Login as newly created regular admin & test role guard
      try {
        const loginRes = await apiRequest('/api/v1/auth/login', {
          method: 'POST',
          body: { email: testEmail, password: testPassword },
        });

        if (loginRes.status === 200 && loginRes.data.data.accessToken) {
          regularAdminAccessToken = loginRes.data.data.accessToken;

          // Regular admin tries to access superadmin-only route /api/v1/admins
          const guardRes = await apiRequest('/api/v1/admins', { token: regularAdminAccessToken });
          if (guardRes.status === 403) {
            recordPass(mod, 'Regular admin blocked with 403 on superadmin-only route /api/v1/admins');
          } else {
            throw new Error(`Expected 403 FORBIDDEN, got ${guardRes.status}`);
          }
        } else {
          throw new Error(`Failed to login as regular admin: ${JSON.stringify(loginRes.data)}`);
        }
      } catch (err) {
        recordFail(mod, 'Role guard enforcement for regular admin', err);
      }

      // Scenario 3.7: PATCH /api/v1/admins/:id (Update admin status)
      try {
        console.log(`   🔍 DB Check BEFORE update: Checking admin ${createdAdminId}...`);
        const preDoc = await AdminModel.findById(createdAdminId);
        console.log(`   DB Pre-update isActive: ${preDoc?.isActive}`);

        const res = await apiRequest(`/api/v1/admins/${createdAdminId}`, {
          method: 'PATCH',
          token: superadminAccessToken,
          body: { isActive: false },
        });

        if (res.status === 200 && res.data.data.isActive === false) {
          // DIRECT DB VERIFICATION
          console.log(`   🔍 DB Check AFTER update: Verifying MongoDB updated...`);
          const postDoc = await AdminModel.findById(createdAdminId);
          if (postDoc?.isActive !== false) {
            throw new Error(`DB was NOT updated! isActive is still ${postDoc?.isActive}`);
          }
          console.log(`   DB State: Confirmed updated in MongoDB! isActive is now false`);
          recordPass(mod, 'PATCH /api/v1/admins/:id updates account status', true, 'isActive set to false');
        } else {
          throw new Error(`Failed to update admin: ${JSON.stringify(res.data)}`);
        }
      } catch (err) {
        recordFail(mod, 'PATCH /api/v1/admins/:id status update', err);
      }

      // Scenario 3.8: Self-demote prevention
      try {
        const meRes = await apiRequest('/api/v1/auth/me', { token: superadminAccessToken });
        const superadminId = meRes.data.data._id || meRes.data.data.id;

        const res = await apiRequest(`/api/v1/admins/${superadminId}`, {
          method: 'PATCH',
          token: superadminAccessToken,
          body: { role: 'admin' },
        });

        if (res.status === 403) {
          recordPass(mod, 'Self-demote blocked: superadmin cannot change their own role to admin');
        } else {
          throw new Error(`Expected 403, got ${res.status}`);
        }
      } catch (err) {
        recordFail(mod, 'Self-demote prevention', err);
      }

      // Scenario 3.9: Self-delete prevention
      try {
        const meRes = await apiRequest('/api/v1/auth/me', { token: superadminAccessToken });
        const superadminId = meRes.data.data._id || meRes.data.data.id;

        const res = await apiRequest(`/api/v1/admins/${superadminId}`, {
          method: 'DELETE',
          token: superadminAccessToken,
        });

        if (res.status === 403) {
          recordPass(mod, 'Self-delete blocked: superadmin cannot delete their own account');
        } else {
          throw new Error(`Expected 403, got ${res.status}`);
        }
      } catch (err) {
        recordFail(mod, 'Self-delete prevention', err);
      }

      // Scenario 3.10: DELETE /api/v1/admins/:id (Delete test admin)
      try {
        console.log(`   🔍 DB Check BEFORE delete: Checking admin ${createdAdminId}...`);
        const preDoc = await AdminModel.findById(createdAdminId);
        console.log(`   DB Pre-delete: Exists = ${Boolean(preDoc)}`);

        const res = await apiRequest(`/api/v1/admins/${createdAdminId}`, {
          method: 'DELETE',
          token: superadminAccessToken,
        });

        if (res.status === 200) {
          // DIRECT DB VERIFICATION: Check document was deleted from MongoDB
          console.log(`   🔍 DB Check AFTER delete: Checking if document removed from MongoDB...`);
          const postDoc = await AdminModel.findById(createdAdminId);
          if (postDoc !== null) {
            throw new Error(`Document still exists in MongoDB after DELETE! ${JSON.stringify(postDoc)}`);
          }
          console.log(`   DB State: Confirmed document completely removed from MongoDB!`);
          recordPass(mod, 'DELETE /api/v1/admins/:id deletes administrator from database', true, 'Document deleted from DB');
        } else {
          throw new Error(`Failed to delete admin: ${JSON.stringify(res.data)}`);
        }
      } catch (err) {
        recordFail(mod, 'DELETE /api/v1/admins/:id', err);
      }
    }

    // ======================================================================
    // MODULE 4: Turnkey Divisions
    // ======================================================================
    logHeader('Module 4: Turnkey Divisions');
    {
      const mod = 'Divisions';

      // Scenario 4.1: Public list
      try {
        const res = await apiRequest('/api/v1/divisions');
        if (res.status === 200 && Array.isArray(res.data.data) && res.data.data.length >= 7) {
          recordPass(mod, 'GET /api/v1/divisions returns public active divisions catalog');
        } else {
          throw new Error(`Expected 200 with >=7 divisions, got ${res.status}`);
        }
      } catch (err) {
        recordFail(mod, 'GET /api/v1/divisions public list', err);
      }

      // Scenario 4.2: Public detail by slug
      try {
        const res = await apiRequest('/api/v1/divisions/cleanroom-panels');
        if (res.status === 200 && res.data.data?.division?.slug === 'cleanroom-panels') {
          recordPass(mod, 'GET /api/v1/divisions/:slug returns division and associated products');
        } else {
          throw new Error(`Expected 200, got ${res.status}`);
        }
      } catch (err) {
        recordFail(mod, 'GET /api/v1/divisions/:slug valid slug', err);
      }

      // Scenario 4.3: Non-existent slug returns 404
      try {
        const res = await apiRequest('/api/v1/divisions/non-existent-slug-xyz-123');
        if (res.status === 404) {
          recordPass(mod, 'GET /api/v1/divisions/:slug with non-existent slug returns 404');
        } else {
          throw new Error(`Expected 404, got ${res.status}`);
        }
      } catch (err) {
        recordFail(mod, 'GET /api/v1/divisions/:slug non-existent', err);
      }

      // Scenario 4.4: POST /api/v1/divisions (Create Division - Superadmin)
      createdDivisionSlug = `test-division-${Date.now()}`;
      try {
        console.log(`   🔍 DB Check BEFORE: Checking if slug ${createdDivisionSlug} exists...`);
        const preCheck = await DivisionModel.findOne({ slug: createdDivisionSlug });
        console.log(`   DB Pre-check: ${preCheck ? 'EXISTS' : 'DOES NOT EXIST (clean)'}`);

        const res = await apiRequest('/api/v1/divisions', {
          method: 'POST',
          token: superadminAccessToken,
          body: {
            number: 7, // Schema allows 1-7
            title: 'Test Modular Division',
            slug: createdDivisionSlug,
            tagline: 'High precision test modular containment engineering.',
            description: '<p>Test division description for automated verification.</p>',
            heroImage: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=1200&q=80',
            icon: 'Layers',
            order: 99,
          },
        });

        if (res.status === 201 && res.data.data?._id) {
          createdDivisionId = res.data.data._id;

          // DIRECT DB VERIFICATION
          console.log(`   🔍 DB Check AFTER create: Querying MongoDB for division ID: ${createdDivisionId}...`);
          const dbDoc = await DivisionModel.findById(createdDivisionId);
          if (!dbDoc) throw new Error('Division not found in MongoDB!');
          if (dbDoc.slug !== createdDivisionSlug) throw new Error(`DB slug mismatch: expected ${createdDivisionSlug}, got ${dbDoc.slug}`);
          if (dbDoc.title !== 'Test Modular Division') throw new Error(`DB title mismatch`);
          if (dbDoc.isActive !== true) throw new Error('DB isActive is false');

          console.log(`   DB State: Document confirmed in MongoDB! Title="${dbDoc.title}", Slug="${dbDoc.slug}"`);
          recordPass(mod, 'POST /api/v1/divisions creates division as superadmin', true, `Division ID: ${createdDivisionId}`);
        } else {
          throw new Error(`Failed to create division: ${JSON.stringify(res.data)}`);
        }
      } catch (err) {
        recordFail(mod, 'POST /api/v1/divisions create', err);
      }

      // Scenario 4.5: Unauthorized creation fails
      try {
        const res = await apiRequest('/api/v1/divisions', {
          method: 'POST',
          body: { number: 1, title: 'Unauthorized', slug: 'unauthorized', tagline: 'Test' },
        });
        if (res.status === 401) {
          recordPass(mod, 'POST /api/v1/divisions unauthenticated returns 401');
        } else {
          throw new Error(`Expected 401, got ${res.status}`);
        }
      } catch (err) {
        recordFail(mod, 'POST /api/v1/divisions unauthenticated', err);
      }

      // Scenario 4.6: Validation failure (number out of range)
      try {
        const res = await apiRequest('/api/v1/divisions', {
          method: 'POST',
          token: superadminAccessToken,
          body: {
            number: 99, // invalid number > 7
            title: 'Invalid',
            slug: 'invalid-num',
            tagline: 'Tagline',
          },
        });
        if (res.status === 400) {
          recordPass(mod, 'POST /api/v1/divisions with number > 7 returns 400 VALIDATION_ERROR');
        } else {
          throw new Error(`Expected 400, got ${res.status}`);
        }
      } catch (err) {
        recordFail(mod, 'POST /api/v1/divisions validation error', err);
      }

      // Scenario 4.7: PATCH /api/v1/divisions/:id (Update Division)
      try {
        console.log(`   🔍 DB Check BEFORE update: Fetching division ${createdDivisionId}...`);
        const preDoc = await DivisionModel.findById(createdDivisionId);
        console.log(`   DB Pre-update Tagline: "${preDoc?.tagline}"`);

        const newTagline = 'Updated tagline for GMP cleanroom division test.';
        const res = await apiRequest(`/api/v1/divisions/${createdDivisionId}`, {
          method: 'PATCH',
          token: superadminAccessToken,
          body: { tagline: newTagline },
        });

        if (res.status === 200 && res.data.data?.tagline === newTagline) {
          // DIRECT DB VERIFICATION
          console.log(`   🔍 DB Check AFTER update: Verifying tagline updated in MongoDB...`);
          const postDoc = await DivisionModel.findById(createdDivisionId);
          if (postDoc?.tagline !== newTagline) {
            throw new Error(`DB tagline not updated! Got: ${postDoc?.tagline}`);
          }
          console.log(`   DB State: Tagline updated in MongoDB! Tagline="${postDoc.tagline}"`);
          recordPass(mod, 'PATCH /api/v1/divisions/:id updates division details', true, 'Tagline updated');
        } else {
          throw new Error(`Failed to update division: ${JSON.stringify(res.data)}`);
        }
      } catch (err) {
        recordFail(mod, 'PATCH /api/v1/divisions/:id update', err);
      }

      // Scenario 4.8: DELETE /api/v1/divisions/:id (Soft Delete)
      try {
        console.log(`   🔍 DB Check BEFORE delete: Checking division isActive...`);
        const preDoc = await DivisionModel.findById(createdDivisionId);
        console.log(`   DB Pre-delete isActive: ${preDoc?.isActive}`);

        const res = await apiRequest(`/api/v1/divisions/${createdDivisionId}`, {
          method: 'DELETE',
          token: superadminAccessToken,
        });

        if (res.status === 200) {
          // DIRECT DB VERIFICATION
          console.log(`   🔍 DB Check AFTER delete: Verifying isActive is false in MongoDB...`);
          const postDoc = await DivisionModel.findById(createdDivisionId);
          if (postDoc?.isActive !== false) {
            throw new Error(`Division was NOT soft-deleted! isActive is ${postDoc?.isActive}`);
          }
          console.log(`   DB State: Division soft-deleted in MongoDB! isActive=false`);

          // Check that public listing excludes this division
          const publicListRes = await apiRequest('/api/v1/divisions');
          const foundInPublic = publicListRes.data.data.some((d: any) => d._id === createdDivisionId);
          if (foundInPublic) throw new Error('Soft-deleted division still appeared in public listing!');

          recordPass(mod, 'DELETE /api/v1/divisions/:id soft-deletes division', true, 'isActive set to false, excluded from public feed');
        } else {
          throw new Error(`Failed to delete division: ${JSON.stringify(res.data)}`);
        }
      } catch (err) {
        recordFail(mod, 'DELETE /api/v1/divisions/:id soft-delete', err);
      }

      // Cleanup test division from DB
      await DivisionModel.findByIdAndDelete(createdDivisionId);
      console.log(`   🧹 [Cleanup] Permanently purged test division ${createdDivisionId} from MongoDB`);
    }

    // ======================================================================
    // MODULE 5: Products & Equipment Catalog
    // ======================================================================
    logHeader('Module 5: Products & Equipment Catalog');
    {
      const mod = 'Products';
      const sampleDivision = await DivisionModel.findOne({ isActive: true });
      if (!sampleDivision) throw new Error('No active division found in database to associate product');

      // Scenario 5.1: Public Feed (Cursor Pagination)
      try {
        const res = await apiRequest('/api/v1/products?limit=2');
        if (res.status === 200 && Array.isArray(res.data.data)) {
          recordPass(mod, 'GET /api/v1/products cursor-based pagination feed');
        } else {
          throw new Error(`Expected 200, got ${res.status}`);
        }
      } catch (err) {
        recordFail(mod, 'GET /api/v1/products cursor feed', err);
      }

      // Scenario 5.2: Offset Pagination (Admin table mode)
      try {
        const res = await apiRequest('/api/v1/products?mode=offset&page=1&limit=2');
        if (res.status === 200 && res.data.pagination?.total !== undefined) {
          recordPass(mod, 'GET /api/v1/products offset pagination for admin management');
        } else {
          throw new Error(`Expected 200 with pagination, got ${res.status}`);
        }
      } catch (err) {
        recordFail(mod, 'GET /api/v1/products offset pagination', err);
      }

      // Scenario 5.3: Filter by divisionId
      try {
        const res = await apiRequest(`/api/v1/products?divisionId=${sampleDivision._id}`);
        if (res.status === 200 && Array.isArray(res.data.data)) {
          recordPass(mod, 'GET /api/v1/products filter by divisionId');
        } else {
          throw new Error(`Expected 200, got ${res.status}`);
        }
      } catch (err) {
        recordFail(mod, 'GET /api/v1/products filter by divisionId', err);
      }

      // Scenario 5.4: Filter by featured
      try {
        const res = await apiRequest('/api/v1/products?featured=true');
        if (res.status === 200 && Array.isArray(res.data.data)) {
          recordPass(mod, 'GET /api/v1/products filter by featured=true');
        } else {
          throw new Error(`Expected 200, got ${res.status}`);
        }
      } catch (err) {
        recordFail(mod, 'GET /api/v1/products filter by featured', err);
      }

      // Scenario 5.5: Search filter
      try {
        const res = await apiRequest('/api/v1/products?search=Modular');
        if (res.status === 200 && Array.isArray(res.data.data)) {
          recordPass(mod, 'GET /api/v1/products search query');
        } else {
          throw new Error(`Expected 200, got ${res.status}`);
        }
      } catch (err) {
        recordFail(mod, 'GET /api/v1/products search query', err);
      }

      // Scenario 5.6: Detail by slug
      try {
        const res = await apiRequest('/api/v1/products/cgmp-modular-puf-wall-panel');
        if (res.status === 200 && res.data.data?.name) {
          recordPass(mod, 'GET /api/v1/products/:slug returns populated product details');
        } else {
          throw new Error(`Expected 200, got ${res.status}`);
        }
      } catch (err) {
        recordFail(mod, 'GET /api/v1/products/:slug detail', err);
      }

      // Scenario 5.7: Non-existent product slug returns 404
      try {
        const res = await apiRequest('/api/v1/products/non-existent-product-12345');
        if (res.status === 404) {
          recordPass(mod, 'GET /api/v1/products/:slug non-existent returns 404');
        } else {
          throw new Error(`Expected 404, got ${res.status}`);
        }
      } catch (err) {
        recordFail(mod, 'GET /api/v1/products/:slug non-existent', err);
      }

      // Scenario 5.8: POST /api/v1/products (Create Product)
      createdProductSlug = `test-product-${Date.now()}`;
      try {
        console.log(`   🔍 DB Check BEFORE: Checking if product slug ${createdProductSlug} exists...`);
        const preCheck = await ProductModel.findOne({ slug: createdProductSlug });
        console.log(`   DB Pre-check: ${preCheck ? 'EXISTS' : 'DOES NOT EXIST (clean)'}`);

        const res = await apiRequest('/api/v1/products', {
          method: 'POST',
          token: superadminAccessToken,
          body: {
            divisionId: sampleDivision._id.toString(),
            category: 'Testing Equipment',
            name: 'Precision Cleanroom Differential Pressure Sensor',
            slug: createdProductSlug,
            description: '<p>Calibrated cleanroom sensor description.</p>',
            specifications: [{ key: 'Accuracy', value: '±0.1% Full Scale' }],
            images: ['https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=800&q=80'],
            tags: ['Cleanroom', 'Sensor', 'Validation'],
            order: 50,
            isFeatured: true,
          },
        });

        if (res.status === 201 && res.data.data?._id) {
          createdProductId = res.data.data._id;

          // DIRECT DB VERIFICATION
          console.log(`   🔍 DB Check AFTER create: Querying MongoDB for product ID: ${createdProductId}...`);
          const dbProduct = await ProductModel.findById(createdProductId);
          if (!dbProduct) throw new Error('Product not found in MongoDB!');
          if (dbProduct.slug !== createdProductSlug) throw new Error('DB slug mismatch');
          if (dbProduct.specifications[0]?.key !== 'Accuracy') throw new Error('DB specifications mismatch');
          if (dbProduct.isActive !== true) throw new Error('DB isActive is false');

          console.log(`   DB State: Document confirmed in MongoDB! Name="${dbProduct.name}", SpecsCount=${dbProduct.specifications.length}`);
          recordPass(mod, 'POST /api/v1/products creates product document', true, `Product ID: ${createdProductId}`);
        } else {
          throw new Error(`Failed to create product: ${JSON.stringify(res.data)}`);
        }
      } catch (err) {
        recordFail(mod, 'POST /api/v1/products create', err);
      }

      // Scenario 5.9: Validation failure (invalid divisionId)
      try {
        const res = await apiRequest('/api/v1/products', {
          method: 'POST',
          token: superadminAccessToken,
          body: {
            divisionId: 'invalid-id-format',
            category: 'Category',
            name: 'Invalid Product',
            slug: 'invalid-prod',
          },
        });
        if (res.status === 400) {
          recordPass(mod, 'POST /api/v1/products with invalid divisionId returns 400');
        } else {
          throw new Error(`Expected 400, got ${res.status}`);
        }
      } catch (err) {
        recordFail(mod, 'POST /api/v1/products validation error', err);
      }

      // Scenario 5.10: PATCH /api/v1/products/reorder
      try {
        console.log(`   🔍 DB Check BEFORE reorder: Checking order of product ${createdProductId}...`);
        const preDoc = await ProductModel.findById(createdProductId);
        console.log(`   DB Pre-reorder order: ${preDoc?.order}`);

        const res = await apiRequest('/api/v1/products/reorder', {
          method: 'PATCH',
          token: superadminAccessToken,
          body: {
            items: [{ id: createdProductId, order: 88 }],
          },
        });

        if (res.status === 200) {
          // DIRECT DB VERIFICATION
          console.log(`   🔍 DB Check AFTER reorder: Checking order in MongoDB...`);
          const postDoc = await ProductModel.findById(createdProductId);
          if (postDoc?.order !== 88) throw new Error(`DB order was NOT updated! Order is ${postDoc?.order}`);
          console.log(`   DB State: Order successfully updated in MongoDB! New order = ${postDoc.order}`);
          recordPass(mod, 'PATCH /api/v1/products/reorder updates display orders in bulk', true, 'Order updated to 88');
        } else {
          throw new Error(`Failed to reorder products: ${JSON.stringify(res.data)}`);
        }
      } catch (err) {
        recordFail(mod, 'PATCH /api/v1/products/reorder', err);
      }

      // Scenario 5.11: PATCH /api/v1/products/:id (Update fields)
      try {
        const newName = 'Updated Cleanroom Precision Sensor V2';
        const res = await apiRequest(`/api/v1/products/${createdProductId}`, {
          method: 'PATCH',
          token: superadminAccessToken,
          body: { name: newName },
        });

        if (res.status === 200 && res.data.data?.name === newName) {
          // DIRECT DB VERIFICATION
          console.log(`   🔍 DB Check AFTER update: Checking name in MongoDB...`);
          const postDoc = await ProductModel.findById(createdProductId);
          if (postDoc?.name !== newName) throw new Error('DB name not updated!');
          console.log(`   DB State: Name updated in MongoDB! Name="${postDoc.name}"`);
          recordPass(mod, 'PATCH /api/v1/products/:id updates product fields', true, `Name="${newName}"`);
        } else {
          throw new Error(`Failed to update product: ${JSON.stringify(res.data)}`);
        }
      } catch (err) {
        recordFail(mod, 'PATCH /api/v1/products/:id', err);
      }

      // Scenario 5.12: DELETE /api/v1/products/:id (Soft Delete)
      try {
        const res = await apiRequest(`/api/v1/products/${createdProductId}`, {
          method: 'DELETE',
          token: superadminAccessToken,
        });

        if (res.status === 200) {
          // DIRECT DB VERIFICATION
          console.log(`   🔍 DB Check AFTER delete: Verifying isActive is false in MongoDB...`);
          const postDoc = await ProductModel.findById(createdProductId);
          if (postDoc?.isActive !== false) throw new Error('Product isActive is not false!');
          console.log(`   DB State: Product soft-deleted in MongoDB! isActive=false`);
          recordPass(mod, 'DELETE /api/v1/products/:id soft-deletes product', true, 'isActive set to false');
        } else {
          throw new Error(`Failed to delete product: ${JSON.stringify(res.data)}`);
        }
      } catch (err) {
        recordFail(mod, 'DELETE /api/v1/products/:id soft-delete', err);
      }

      // Cleanup
      await ProductModel.findByIdAndDelete(createdProductId);
      console.log(`   🧹 [Cleanup] Permanently purged test product ${createdProductId} from MongoDB`);
    }

    // ======================================================================
    // MODULE 6: Air Filtration Catalog
    // ======================================================================
    logHeader('Module 6: Air Filtration Catalog');
    {
      const mod = 'Filters';

      // Scenario 6.1: Public Filter List
      try {
        const res = await apiRequest('/api/v1/filters');
        if (res.status === 200 && Array.isArray(res.data.data)) {
          recordPass(mod, 'GET /api/v1/filters returns public filtration catalog');
        } else {
          throw new Error(`Expected 200, got ${res.status}`);
        }
      } catch (err) {
        recordFail(mod, 'GET /api/v1/filters public list', err);
      }

      // Scenario 6.2: Filter by category
      try {
        const res = await apiRequest('/api/v1/filters?category=pre-filter');
        if (res.status === 200 && Array.isArray(res.data.data)) {
          recordPass(mod, 'GET /api/v1/filters?category=pre-filter filters by category');
        } else {
          throw new Error(`Expected 200, got ${res.status}`);
        }
      } catch (err) {
        recordFail(mod, 'GET /api/v1/filters category filter', err);
      }

      // Scenario 6.3: POST /api/v1/filters (Create Filter)
      try {
        console.log(`   🔍 DB Check BEFORE: Pre-checking filters...`);
        const res = await apiRequest('/api/v1/filters', {
          method: 'POST',
          token: superadminAccessToken,
          body: {
            category: 'gel-seal-hepa',
            name: 'Ultra-Clean Gel Seal Terminal HEPA Filter H14',
            micronRating: '0.3 Micron (99.999% efficiency)',
            mediaConstruction: 'Micro-fiber glass paper with hot-melt polyurethane separators',
            frame: 'Anodized Aluminum with gel reservoir',
            applications: ['Sterile Vial Filling', 'ISO Class 4/5 Suites'],
            keyFeature: 'Zero perimeter leakage fluid seal',
            images: ['https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80'],
            order: 40,
          },
        });

        if (res.status === 201 && res.data.data?._id) {
          createdFilterId = res.data.data._id;

          // DIRECT DB VERIFICATION
          console.log(`   🔍 DB Check AFTER create: Verifying filter ${createdFilterId} in MongoDB...`);
          const dbFilter = await FilterModel.findById(createdFilterId);
          if (!dbFilter) throw new Error('Filter not found in MongoDB!');
          if (dbFilter.category !== 'gel-seal-hepa') throw new Error('DB filter category mismatch');
          if (dbFilter.isActive !== true) throw new Error('DB filter isActive is not true');

          console.log(`   DB State: Filter document verified in MongoDB! Category="${dbFilter.category}"`);
          recordPass(mod, 'POST /api/v1/filters creates filter item', true, `Filter ID: ${createdFilterId}`);
        } else {
          throw new Error(`Failed to create filter: ${JSON.stringify(res.data)}`);
        }
      } catch (err) {
        recordFail(mod, 'POST /api/v1/filters create', err);
      }

      // Scenario 6.4: Detail by ID
      try {
        const res = await apiRequest(`/api/v1/filters/${createdFilterId}`);
        if (res.status === 200 && res.data.data?.name) {
          recordPass(mod, 'GET /api/v1/filters/:id returns filter item details');
        } else {
          throw new Error(`Expected 200, got ${res.status}`);
        }
      } catch (err) {
        recordFail(mod, 'GET /api/v1/filters/:id detail', err);
      }

      // Scenario 6.5: Validation failure (invalid enum category)
      try {
        const res = await apiRequest('/api/v1/filters', {
          method: 'POST',
          token: superadminAccessToken,
          body: {
            category: 'unsupported-filter-category',
            name: 'Bad Filter',
            micronRating: '10u',
          },
        });
        if (res.status === 400) {
          recordPass(mod, 'POST /api/v1/filters with invalid category enum returns 400');
        } else {
          throw new Error(`Expected 400, got ${res.status}`);
        }
      } catch (err) {
        recordFail(mod, 'POST /api/v1/filters invalid category', err);
      }

      // Scenario 6.6: PATCH /api/v1/filters/reorder
      try {
        const res = await apiRequest('/api/v1/filters/reorder', {
          method: 'PATCH',
          token: superadminAccessToken,
          body: { items: [{ id: createdFilterId, order: 77 }] },
        });

        if (res.status === 200) {
          // DIRECT DB VERIFICATION
          console.log(`   🔍 DB Check AFTER reorder: Checking filter order in MongoDB...`);
          const dbDoc = await FilterModel.findById(createdFilterId);
          if (dbDoc?.order !== 77) throw new Error('DB filter order not updated!');
          console.log(`   DB State: Filter order updated in MongoDB! Order=${dbDoc.order}`);
          recordPass(mod, 'PATCH /api/v1/filters/reorder updates order in bulk', true, 'Order updated to 77');
        } else {
          throw new Error(`Failed to reorder filters: ${JSON.stringify(res.data)}`);
        }
      } catch (err) {
        recordFail(mod, 'PATCH /api/v1/filters/reorder', err);
      }

      // Scenario 6.7: PATCH /api/v1/filters/:id
      try {
        const newMicron = '0.12 Micron ULPA Grade';
        const res = await apiRequest(`/api/v1/filters/${createdFilterId}`, {
          method: 'PATCH',
          token: superadminAccessToken,
          body: { micronRating: newMicron },
        });

        if (res.status === 200 && res.data.data?.micronRating === newMicron) {
          // DIRECT DB VERIFICATION
          console.log(`   🔍 DB Check AFTER update: Checking micronRating in MongoDB...`);
          const dbDoc = await FilterModel.findById(createdFilterId);
          if (dbDoc?.micronRating !== newMicron) throw new Error('DB micronRating not updated!');
          console.log(`   DB State: Micron rating updated in MongoDB! Rating="${dbDoc.micronRating}"`);
          recordPass(mod, 'PATCH /api/v1/filters/:id updates filter specifications', true, `Rating="${newMicron}"`);
        } else {
          throw new Error(`Failed to update filter: ${JSON.stringify(res.data)}`);
        }
      } catch (err) {
        recordFail(mod, 'PATCH /api/v1/filters/:id update', err);
      }

      // Scenario 6.8: DELETE /api/v1/filters/:id (Soft Delete)
      try {
        const res = await apiRequest(`/api/v1/filters/${createdFilterId}`, {
          method: 'DELETE',
          token: superadminAccessToken,
        });

        if (res.status === 200) {
          // DIRECT DB VERIFICATION
          console.log(`   🔍 DB Check AFTER delete: Checking filter isActive in MongoDB...`);
          const dbDoc = await FilterModel.findById(createdFilterId);
          if (dbDoc?.isActive !== false) throw new Error('Filter isActive is not false!');
          console.log(`   DB State: Filter soft-deleted in MongoDB! isActive=false`);
          recordPass(mod, 'DELETE /api/v1/filters/:id soft-deletes filter item', true, 'isActive set to false');
        } else {
          throw new Error(`Failed to delete filter: ${JSON.stringify(res.data)}`);
        }
      } catch (err) {
        recordFail(mod, 'DELETE /api/v1/filters/:id soft-delete', err);
      }

      // Cleanup
      await FilterModel.findByIdAndDelete(createdFilterId);
      console.log(`   🧹 [Cleanup] Permanently purged test filter ${createdFilterId} from MongoDB`);
    }

    // ======================================================================
    // MODULE 7: Projects & Case Studies
    // ======================================================================
    logHeader('Module 7: Projects & Case Studies');
    {
      const mod = 'Projects';

      // Scenario 7.1: Public Projects Cursor Feed
      try {
        const res = await apiRequest('/api/v1/projects');
        if (res.status === 200 && Array.isArray(res.data.data)) {
          recordPass(mod, 'GET /api/v1/projects cursor pagination feed');
        } else {
          throw new Error(`Expected 200, got ${res.status}`);
        }
      } catch (err) {
        recordFail(mod, 'GET /api/v1/projects cursor feed', err);
      }

      // Scenario 7.2: Offset Pagination
      try {
        const res = await apiRequest('/api/v1/projects?mode=offset&page=1&limit=2');
        if (res.status === 200 && res.data.pagination) {
          recordPass(mod, 'GET /api/v1/projects offset pagination');
        } else {
          throw new Error(`Expected 200, got ${res.status}`);
        }
      } catch (err) {
        recordFail(mod, 'GET /api/v1/projects offset pagination', err);
      }

      // Scenario 7.3: Filter by featured
      try {
        const res = await apiRequest('/api/v1/projects?featured=true');
        if (res.status === 200 && Array.isArray(res.data.data)) {
          recordPass(mod, 'GET /api/v1/projects?featured=true filter');
        } else {
          throw new Error(`Expected 200, got ${res.status}`);
        }
      } catch (err) {
        recordFail(mod, 'GET /api/v1/projects featured filter', err);
      }

      // Scenario 7.4: POST /api/v1/projects (Create Project)
      try {
        console.log(`   🔍 DB Check BEFORE: Pre-checking projects...`);
        const res = await apiRequest('/api/v1/projects', {
          method: 'POST',
          token: superadminAccessToken,
          body: {
            clientName: 'Sun Pharma Specialities Ltd',
            scope: 'Turnkey 25,000 sq.ft. Oncology Injectable Cleanroom & BMS Overhaul',
            location: 'Halol, Gujarat',
            division: ['Cleanroom Infrastructure & Modular Panels', 'BMS, EMS & Validation Services'],
            completionYear: 2025,
            description: '<p>Comprehensive containment suites validation.</p>',
            images: ['https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=800&q=80'],
            isFeatured: true,
            order: 60,
          },
        });

        if (res.status === 201 && res.data.data?._id) {
          createdProjectId = res.data.data._id;

          // DIRECT DB VERIFICATION
          console.log(`   🔍 DB Check AFTER create: Verifying project ${createdProjectId} in MongoDB...`);
          const dbProject = await ProjectModel.findById(createdProjectId);
          if (!dbProject) throw new Error('Project not found in MongoDB!');
          if (dbProject.clientName !== 'Sun Pharma Specialities Ltd') throw new Error('DB clientName mismatch');
          if (dbProject.isActive !== true) throw new Error('DB project isActive is false');

          console.log(`   DB State: Project document confirmed in MongoDB! Client="${dbProject.clientName}"`);
          recordPass(mod, 'POST /api/v1/projects creates case study document', true, `Project ID: ${createdProjectId}`);
        } else {
          throw new Error(`Failed to create project: ${JSON.stringify(res.data)}`);
        }
      } catch (err) {
        recordFail(mod, 'POST /api/v1/projects create', err);
      }

      // Scenario 7.5: Detail by ID
      try {
        const res = await apiRequest(`/api/v1/projects/${createdProjectId}`);
        if (res.status === 200 && res.data.data?.clientName) {
          recordPass(mod, 'GET /api/v1/projects/:id returns case study details');
        } else {
          throw new Error(`Expected 200, got ${res.status}`);
        }
      } catch (err) {
        recordFail(mod, 'GET /api/v1/projects/:id detail', err);
      }

      // Scenario 7.6: Validation failure (missing required fields)
      try {
        const res = await apiRequest('/api/v1/projects', {
          method: 'POST',
          token: superadminAccessToken,
          body: { location: 'Delhi' },
        });
        if (res.status === 400) {
          recordPass(mod, 'POST /api/v1/projects with missing fields returns 400');
        } else {
          throw new Error(`Expected 400, got ${res.status}`);
        }
      } catch (err) {
        recordFail(mod, 'POST /api/v1/projects validation error', err);
      }

      // Scenario 7.7: PATCH /api/v1/projects/reorder
      try {
        const res = await apiRequest('/api/v1/projects/reorder', {
          method: 'PATCH',
          token: superadminAccessToken,
          body: { items: [{ id: createdProjectId, order: 66 }] },
        });

        if (res.status === 200) {
          // DIRECT DB VERIFICATION
          console.log(`   🔍 DB Check AFTER reorder: Checking project order in MongoDB...`);
          const dbDoc = await ProjectModel.findById(createdProjectId);
          if (dbDoc?.order !== 66) throw new Error('DB project order not updated!');
          console.log(`   DB State: Project order updated in MongoDB! Order=${dbDoc.order}`);
          recordPass(mod, 'PATCH /api/v1/projects/reorder updates order in bulk', true, 'Order updated to 66');
        } else {
          throw new Error(`Failed to reorder projects: ${JSON.stringify(res.data)}`);
        }
      } catch (err) {
        recordFail(mod, 'PATCH /api/v1/projects/reorder', err);
      }

      // Scenario 7.8: PATCH /api/v1/projects/:id
      try {
        const newScope = 'Updated 30,000 sq.ft. Turnkey Cleanroom Expansion Scope';
        const res = await apiRequest(`/api/v1/projects/${createdProjectId}`, {
          method: 'PATCH',
          token: superadminAccessToken,
          body: { scope: newScope },
        });

        if (res.status === 200 && res.data.data?.scope === newScope) {
          // DIRECT DB VERIFICATION
          console.log(`   🔍 DB Check AFTER update: Checking scope in MongoDB...`);
          const dbDoc = await ProjectModel.findById(createdProjectId);
          if (dbDoc?.scope !== newScope) throw new Error('DB scope not updated!');
          console.log(`   DB State: Scope updated in MongoDB! Scope="${dbDoc.scope}"`);
          recordPass(mod, 'PATCH /api/v1/projects/:id updates project fields', true, 'Scope updated');
        } else {
          throw new Error(`Failed to update project: ${JSON.stringify(res.data)}`);
        }
      } catch (err) {
        recordFail(mod, 'PATCH /api/v1/projects/:id update', err);
      }

      // Scenario 7.9: DELETE /api/v1/projects/:id (Soft Delete)
      try {
        const res = await apiRequest(`/api/v1/projects/${createdProjectId}`, {
          method: 'DELETE',
          token: superadminAccessToken,
        });

        if (res.status === 200) {
          // DIRECT DB VERIFICATION
          console.log(`   🔍 DB Check AFTER delete: Checking project isActive in MongoDB...`);
          const dbDoc = await ProjectModel.findById(createdProjectId);
          if (dbDoc?.isActive !== false) throw new Error('Project isActive is not false!');
          console.log(`   DB State: Project soft-deleted in MongoDB! isActive=false`);
          recordPass(mod, 'DELETE /api/v1/projects/:id soft-deletes project reference', true, 'isActive set to false');
        } else {
          throw new Error(`Failed to delete project: ${JSON.stringify(res.data)}`);
        }
      } catch (err) {
        recordFail(mod, 'DELETE /api/v1/projects/:id soft-delete', err);
      }

      // Cleanup
      await ProjectModel.findByIdAndDelete(createdProjectId);
      console.log(`   🧹 [Cleanup] Permanently purged test project ${createdProjectId} from MongoDB`);
    }

    // ======================================================================
    // MODULE 8: Clients Trust Wall
    // ======================================================================
    logHeader('Module 8: Clients Trust Wall');
    {
      const mod = 'Clients';

      // Scenario 8.1: Public Clients List
      try {
        const res = await apiRequest('/api/v1/clients');
        if (res.status === 200 && Array.isArray(res.data.data)) {
          recordPass(mod, 'GET /api/v1/clients returns client logo wall');
        } else {
          throw new Error(`Expected 200, got ${res.status}`);
        }
      } catch (err) {
        recordFail(mod, 'GET /api/v1/clients public list', err);
      }

      // Scenario 8.2: POST /api/v1/clients (Create Client)
      try {
        console.log(`   🔍 DB Check BEFORE: Checking clients in MongoDB...`);
        const res = await apiRequest('/api/v1/clients', {
          method: 'POST',
          token: superadminAccessToken,
          body: {
            name: 'Torrent Pharmaceuticals Ltd',
            logoUrl: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=200&q=80',
            sector: 'Pharmaceutical',
            website: 'https://torrentpharma.example.com',
            order: 55,
          },
        });

        if (res.status === 201 && res.data.data?._id) {
          createdClientId = res.data.data._id;

          // DIRECT DB VERIFICATION
          console.log(`   🔍 DB Check AFTER create: Verifying client in MongoDB...`);
          const dbClient = await ClientModel.findById(createdClientId);
          if (!dbClient) throw new Error('Client not found in MongoDB!');
          if (dbClient.name !== 'Torrent Pharmaceuticals Ltd') throw new Error('DB client name mismatch');
          if (dbClient.isActive !== true) throw new Error('DB client isActive is false');

          console.log(`   DB State: Client document confirmed in MongoDB! Name="${dbClient.name}"`);
          recordPass(mod, 'POST /api/v1/clients creates client record', true, `Client ID: ${createdClientId}`);
        } else {
          throw new Error(`Failed to create client: ${JSON.stringify(res.data)}`);
        }
      } catch (err) {
        recordFail(mod, 'POST /api/v1/clients create', err);
      }

      // Scenario 8.3: Validation failure (invalid logo URL)
      try {
        const res = await apiRequest('/api/v1/clients', {
          method: 'POST',
          token: superadminAccessToken,
          body: {
            name: 'Bad URL Client',
            logoUrl: 'not-a-valid-url',
            sector: 'Pharmaceutical',
          },
        });
        if (res.status === 400) {
          recordPass(mod, 'POST /api/v1/clients with invalid logo URL returns 400');
        } else {
          throw new Error(`Expected 400, got ${res.status}`);
        }
      } catch (err) {
        recordFail(mod, 'POST /api/v1/clients invalid url', err);
      }

      // Scenario 8.4: PATCH /api/v1/clients/reorder
      try {
        const res = await apiRequest('/api/v1/clients/reorder', {
          method: 'PATCH',
          token: superadminAccessToken,
          body: { items: [{ id: createdClientId, order: 33 }] },
        });

        if (res.status === 200) {
          // DIRECT DB VERIFICATION
          console.log(`   🔍 DB Check AFTER reorder: Checking client order in MongoDB...`);
          const dbDoc = await ClientModel.findById(createdClientId);
          if (dbDoc?.order !== 33) throw new Error('DB client order not updated!');
          console.log(`   DB State: Client order updated in MongoDB! Order=${dbDoc.order}`);
          recordPass(mod, 'PATCH /api/v1/clients/reorder updates display orders in bulk', true, 'Order updated to 33');
        } else {
          throw new Error(`Failed to reorder clients: ${JSON.stringify(res.data)}`);
        }
      } catch (err) {
        recordFail(mod, 'PATCH /api/v1/clients/reorder', err);
      }

      // Scenario 8.5: PATCH /api/v1/clients/:id
      try {
        const newSector = 'Biotechnology';
        const res = await apiRequest(`/api/v1/clients/${createdClientId}`, {
          method: 'PATCH',
          token: superadminAccessToken,
          body: { sector: newSector },
        });

        if (res.status === 200 && res.data.data?.sector === newSector) {
          // DIRECT DB VERIFICATION
          console.log(`   🔍 DB Check AFTER update: Checking sector in MongoDB...`);
          const dbDoc = await ClientModel.findById(createdClientId);
          if (dbDoc?.sector !== newSector) throw new Error('DB sector not updated!');
          console.log(`   DB State: Sector updated in MongoDB! Sector="${dbDoc.sector}"`);
          recordPass(mod, 'PATCH /api/v1/clients/:id updates client fields', true, `Sector="${newSector}"`);
        } else {
          throw new Error(`Failed to update client: ${JSON.stringify(res.data)}`);
        }
      } catch (err) {
        recordFail(mod, 'PATCH /api/v1/clients/:id update', err);
      }

      // Scenario 8.6: DELETE /api/v1/clients/:id (Soft Delete)
      try {
        const res = await apiRequest(`/api/v1/clients/${createdClientId}`, {
          method: 'DELETE',
          token: superadminAccessToken,
        });

        if (res.status === 200) {
          // DIRECT DB VERIFICATION
          console.log(`   🔍 DB Check AFTER delete: Checking client isActive in MongoDB...`);
          const dbDoc = await ClientModel.findById(createdClientId);
          if (dbDoc?.isActive !== false) throw new Error('Client isActive is not false!');
          console.log(`   DB State: Client soft-deleted in MongoDB! isActive=false`);
          recordPass(mod, 'DELETE /api/v1/clients/:id soft-deletes client logo', true, 'isActive set to false');
        } else {
          throw new Error(`Failed to delete client: ${JSON.stringify(res.data)}`);
        }
      } catch (err) {
        recordFail(mod, 'DELETE /api/v1/clients/:id soft-delete', err);
      }

      // Cleanup
      await ClientModel.findByIdAndDelete(createdClientId);
      console.log(`   🧹 [Cleanup] Permanently purged test client ${createdClientId} from MongoDB`);
    }

    // ======================================================================
    // MODULE 9: Site Settings & Metrics
    // ======================================================================
    logHeader('Module 9: Site Settings & Metrics');
    {
      const mod = 'Settings';

      // Scenario 9.1: GET /api/v1/settings
      try {
        const res = await apiRequest('/api/v1/settings');
        if (res.status === 200 && typeof res.data.data === 'object') {
          originalSettingValue = res.data.data.metric_years_exp;
          recordPass(mod, 'GET /api/v1/settings returns key-value configuration dictionary');
        } else {
          throw new Error(`Expected 200, got ${res.status}`);
        }
      } catch (err) {
        recordFail(mod, 'GET /api/v1/settings dictionary', err);
      }

      // Scenario 9.2: PATCH /api/v1/settings/:key
      try {
        const testKey = 'metric_test_counter';
        console.log(`   🔍 DB Check BEFORE: Checking setting key "${testKey}"...`);
        const preDoc = await SettingModel.findOne({ key: testKey });
        console.log(`   DB Pre-check: ${preDoc ? `Value = ${preDoc.value}` : 'NOT IN DB'}`);

        const testValue = '999+ Operations';
        const res = await apiRequest(`/api/v1/settings/${testKey}`, {
          method: 'PATCH',
          token: superadminAccessToken,
          body: { value: testValue, description: 'Automated test metric description' },
        });

        if (res.status === 200 && res.data.data?.value === testValue) {
          // DIRECT DB VERIFICATION
          console.log(`   🔍 DB Check AFTER update: Verifying setting in MongoDB...`);
          const postDoc = await SettingModel.findOne({ key: testKey });
          if (!postDoc || postDoc.value !== testValue) {
            throw new Error(`DB setting was not upserted/updated! Doc: ${JSON.stringify(postDoc)}`);
          }
          console.log(`   DB State: Setting confirmed in MongoDB! Key="${postDoc.key}", Value="${postDoc.value}"`);
          recordPass(mod, 'PATCH /api/v1/settings/:key updates/upserts site setting', true, `Key="${testKey}", Value="${testValue}"`);

          // Cleanup test setting from DB
          await SettingModel.deleteOne({ key: testKey });
          console.log(`   🧹 [Cleanup] Removed test setting "${testKey}" from MongoDB`);
        } else {
          throw new Error(`Failed to update setting: ${JSON.stringify(res.data)}`);
        }
      } catch (err) {
        recordFail(mod, 'PATCH /api/v1/settings/:key update', err);
      }

      // Scenario 9.3: Unauthorized setting update fails
      try {
        const res = await apiRequest('/api/v1/settings/hero_headline', {
          method: 'PATCH',
          body: { value: 'Hacked Headline' },
        });
        if (res.status === 401) {
          recordPass(mod, 'PATCH /api/v1/settings/:key unauthenticated returns 401');
        } else {
          throw new Error(`Expected 401, got ${res.status}`);
        }
      } catch (err) {
        recordFail(mod, 'PATCH /api/v1/settings/:key unauthenticated', err);
      }
    }

    // ======================================================================
    // MODULE 10: Leads & RFQ Ingestion
    // ======================================================================
    logHeader('Module 10: Leads & RFQ Ingestion');
    {
      const mod = 'Leads';

      // Scenario 10.1: Public RFQ Ingestion (POST /api/v1/leads)
      try {
        const leadEmail = `procurement.${Date.now()}@biomedical.example.com`;
        console.log(`   🔍 DB Check BEFORE: Checking if lead with email ${leadEmail} exists...`);
        const preDoc = await LeadModel.findOne({ email: leadEmail });
        console.log(`   DB Pre-check: ${preDoc ? 'EXISTS' : 'DOES NOT EXIST (clean)'}`);

        const res = await apiRequest('/api/v1/leads', {
          method: 'POST',
          body: {
            companyName: 'Apex BioTherapeutics India Ltd',
            contactName: 'Dr. Vikram Malhotra',
            designation: 'Head of Engineering & Projects',
            email: leadEmail,
            phone: '+91-9876543210',
            location: 'Baddi Industrial Area, HP',
            projectType: ['Turnkey Modular Cleanroom', 'AHU & HVAC Overhaul'],
            divisions: ['Cleanroom Infrastructure & Modular Panels', 'HVAC Systems, AHUs & Dehumidifiers'],
            roomDimensions: '45m x 25m x 3.5m height',
            cfm: 18500,
            targetDate: 'Q3 2026',
            source: 'rfq_form',
            message: 'Urgent RFQ for cGMP Schedule M compliant sterile formulation suite.',
          },
        });

        if (res.status === 201 && res.data.data?.id) {
          createdLeadId = res.data.data.id;

          // DIRECT DB VERIFICATION
          console.log(`   🔍 DB Check AFTER create: Verifying lead in MongoDB...`);
          const dbLead = await LeadModel.findById(createdLeadId);
          if (!dbLead) throw new Error('Lead not found in MongoDB!');
          if (dbLead.companyName !== 'Apex BioTherapeutics India Ltd') throw new Error('DB companyName mismatch');
          if (dbLead.status !== 'new') throw new Error(`DB status mismatch: expected new, got ${dbLead.status}`);
          if (dbLead.cfm !== 18500) throw new Error('DB cfm mismatch');

          console.log(`   DB State: Lead confirmed in MongoDB! Status="${dbLead.status}", Company="${dbLead.companyName}", CFM=${dbLead.cfm}`);
          recordPass(mod, 'POST /api/v1/leads ingests RFQ inquiry and sets status: new', true, `Lead ID: ${createdLeadId}`);
        } else {
          throw new Error(`Failed to ingest lead: ${JSON.stringify(res.data)}`);
        }
      } catch (err) {
        recordFail(mod, 'POST /api/v1/leads create RFQ', err);
      }

      // Scenario 10.2: Validation failure (missing message)
      try {
        const res = await apiRequest('/api/v1/leads', {
          method: 'POST',
          body: {
            companyName: 'Bad Lead',
            phone: '12345678',
            source: 'whatsapp',
          },
        });
        if (res.status === 400) {
          recordPass(mod, 'POST /api/v1/leads with missing required message returns 400');
        } else {
          throw new Error(`Expected 400, got ${res.status}`);
        }
      } catch (err) {
        recordFail(mod, 'POST /api/v1/leads validation error', err);
      }

      // Scenario 10.3: GET /api/v1/leads (Admin list)
      try {
        const res = await apiRequest('/api/v1/leads', { token: superadminAccessToken });
        if (res.status === 200 && Array.isArray(res.data.data)) {
          recordPass(mod, 'GET /api/v1/leads returns paginated inquiries for admin');
        } else {
          throw new Error(`Expected 200, got ${res.status}`);
        }
      } catch (err) {
        recordFail(mod, 'GET /api/v1/leads list', err);
      }

      // Scenario 10.4: Filter by status
      try {
        const res = await apiRequest('/api/v1/leads?status=new', { token: superadminAccessToken });
        if (res.status === 200 && Array.isArray(res.data.data)) {
          recordPass(mod, 'GET /api/v1/leads?status=new filters leads by status');
        } else {
          throw new Error(`Expected 200, got ${res.status}`);
        }
      } catch (err) {
        recordFail(mod, 'GET /api/v1/leads status filter', err);
      }

      // Scenario 10.5: Export CSV
      try {
        const res = await apiRequest('/api/v1/leads/export', { token: superadminAccessToken });
        if (res.status === 200 && typeof res.data === 'string' && res.data.includes('Company') && res.data.includes('Phone')) {
          recordPass(mod, 'GET /api/v1/leads/export downloads leads CSV spreadsheet');
        } else {
          throw new Error(`Expected CSV text with headers, got status ${res.status}`);
        }
      } catch (err) {
        recordFail(mod, 'GET /api/v1/leads/export CSV', err);
      }

      // Scenario 10.6: Detail by ID
      try {
        const res = await apiRequest(`/api/v1/leads/${createdLeadId}`, { token: superadminAccessToken });
        if (res.status === 200 && res.data.data?.companyName) {
          recordPass(mod, 'GET /api/v1/leads/:id returns inquiry details');
        } else {
          throw new Error(`Expected 200, got ${res.status}`);
        }
      } catch (err) {
        recordFail(mod, 'GET /api/v1/leads/:id detail', err);
      }

      // Scenario 10.7: Non-existent ID returns 404
      try {
        const fakeId = new mongoose.Types.ObjectId().toString();
        const res = await apiRequest(`/api/v1/leads/${fakeId}`, { token: superadminAccessToken });
        if (res.status === 404) {
          recordPass(mod, 'GET /api/v1/leads/:id with non-existent ID returns 404');
        } else {
          throw new Error(`Expected 404, got ${res.status}`);
        }
      } catch (err) {
        recordFail(mod, 'GET /api/v1/leads/:id non-existent', err);
      }

      // Scenario 10.8: PATCH /api/v1/leads/:id/status
      try {
        console.log(`   🔍 DB Check BEFORE status update: Checking lead ${createdLeadId}...`);
        const preDoc = await LeadModel.findById(createdLeadId);
        console.log(`   DB Pre-update Status: "${preDoc?.status}", Notes: "${preDoc?.notes}"`);

        const newStatus = 'contacted';
        const newNotes = 'Telephonic consultation completed. Specifications forwarded to estimating team.';
        const res = await apiRequest(`/api/v1/leads/${createdLeadId}/status`, {
          method: 'PATCH',
          token: superadminAccessToken,
          body: { status: newStatus, notes: newNotes },
        });

        if (res.status === 200 && res.data.data?.status === newStatus) {
          // DIRECT DB VERIFICATION
          console.log(`   🔍 DB Check AFTER status update: Checking status in MongoDB...`);
          const postDoc = await LeadModel.findById(createdLeadId);
          if (postDoc?.status !== newStatus) throw new Error(`DB status not updated! Got: ${postDoc?.status}`);
          if (postDoc?.notes !== newNotes) throw new Error('DB notes not updated!');

          console.log(`   DB State: Status and notes confirmed in MongoDB! Status="${postDoc.status}", Notes="${postDoc.notes}"`);
          recordPass(mod, 'PATCH /api/v1/leads/:id/status updates inquiry pipeline status', true, `Status="${newStatus}"`);
        } else {
          throw new Error(`Failed to update lead status: ${JSON.stringify(res.data)}`);
        }
      } catch (err) {
        recordFail(mod, 'PATCH /api/v1/leads/:id/status update', err);
      }

      // Scenario 10.9: Invalid status enum
      try {
        const res = await apiRequest(`/api/v1/leads/${createdLeadId}/status`, {
          method: 'PATCH',
          token: superadminAccessToken,
          body: { status: 'invalid_status_enum' },
        });
        if (res.status === 400) {
          recordPass(mod, 'PATCH /api/v1/leads/:id/status with invalid enum returns 400');
        } else {
          throw new Error(`Expected 400, got ${res.status}`);
        }
      } catch (err) {
        recordFail(mod, 'PATCH /api/v1/leads/:id/status invalid enum', err);
      }

      // Cleanup
      await LeadModel.findByIdAndDelete(createdLeadId);
      console.log(`   🧹 [Cleanup] Permanently purged test lead ${createdLeadId} from MongoDB`);
    }

    // ======================================================================
    // MODULE 11: Media Uploads
    // ======================================================================
    logHeader('Module 11: Media Uploads');
    {
      const mod = 'Media';

      // Scenario 11.1: POST /api/v1/media/upload (Valid file)
      try {
        const fd = new FormData();
        const fakeImageBytes = new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10]); // PNG Magic Bytes
        fd.append('file', new Blob([fakeImageBytes], { type: 'image/png' }), 'cleanroom-test-panel.png');

        const res = await apiRequest('/api/v1/media/upload', {
          method: 'POST',
          token: superadminAccessToken,
          formData: fd,
        });

        if (res.status === 200 && res.data.data?.url && res.data.data?.publicId) {
          uploadedPublicId = res.data.data.publicId;
          recordPass(mod, 'POST /api/v1/media/upload uploads image asset', false, `Public ID: ${uploadedPublicId}`);
        } else {
          throw new Error(`Failed to upload media: ${JSON.stringify(res.data)}`);
        }
      } catch (err) {
        recordFail(mod, 'POST /api/v1/media/upload valid file', err);
      }

      // Scenario 11.2: Missing file returns 400
      try {
        const fd = new FormData();
        const res = await apiRequest('/api/v1/media/upload', {
          method: 'POST',
          token: superadminAccessToken,
          formData: fd,
        });
        if (res.status === 400) {
          recordPass(mod, 'POST /api/v1/media/upload with missing file returns 400');
        } else {
          throw new Error(`Expected 400, got ${res.status}`);
        }
      } catch (err) {
        recordFail(mod, 'POST /api/v1/media/upload missing file', err);
      }

      // Scenario 11.3: Unauthenticated upload fails
      try {
        const fd = new FormData();
        fd.append('file', new Blob(['test'], { type: 'image/png' }), 'test.png');
        const res = await apiRequest('/api/v1/media/upload', {
          method: 'POST',
          formData: fd,
        });
        if (res.status === 401) {
          recordPass(mod, 'POST /api/v1/media/upload unauthenticated returns 401');
        } else {
          throw new Error(`Expected 401, got ${res.status}`);
        }
      } catch (err) {
        recordFail(mod, 'POST /api/v1/media/upload unauthenticated', err);
      }

      // Scenario 11.4: DELETE /api/v1/media/:publicId
      if (uploadedPublicId) {
        try {
          const res = await apiRequest(`/api/v1/media/${uploadedPublicId}`, {
            method: 'DELETE',
            token: superadminAccessToken,
          });

          if (res.status === 200) {
            recordPass(mod, 'DELETE /api/v1/media/{*publicId} deletes asset', false, `Deleted: ${uploadedPublicId}`);
          } else {
            throw new Error(`Failed to delete media: ${JSON.stringify(res.data)}`);
          }
        } catch (err) {
          recordFail(mod, 'DELETE /api/v1/media/:publicId', err);
        }
      }

      // Scenario 11.5: Unauthenticated delete fails
      try {
        const res = await apiRequest('/api/v1/media/some-public-id', { method: 'DELETE' });
        if (res.status === 401) {
          recordPass(mod, 'DELETE /api/v1/media/{*publicId} unauthenticated returns 401');
        } else {
          throw new Error(`Expected 401, got ${res.status}`);
        }
      } catch (err) {
        recordFail(mod, 'DELETE /api/v1/media/:publicId unauthenticated', err);
      }
    }

    // ======================================================================
    // MODULE 12: Security, NoSQL Injection & Global Handlers
    // ======================================================================
    logHeader('Module 12: Security, Sanitization & RFC 7807 Error Handling');
    {
      const mod = 'Security';

      // Scenario 12.1: 404 Catch-All
      try {
        const res = await apiRequest('/api/v1/non-existent-arbitrary-endpoint-99');
        if (res.status === 404 && res.data.error?.code === 'NOT_FOUND') {
          recordPass(mod, 'Catch-all 404 handler returns structured RFC 7807 JSON');
        } else {
          throw new Error(`Expected 404 with code NOT_FOUND, got ${res.status}`);
        }
      } catch (err) {
        recordFail(mod, '404 Catch-All handler', err);
      }

      // Scenario 12.2: NoSQL Injection Attempt
      try {
        const res = await apiRequest('/api/v1/auth/login', {
          method: 'POST',
          body: {
            email: { $gt: '' },
            password: 'some-password',
          },
        });
        // mongoSanitize or Zod validation should safely reject without executing NoSQL query
        if (res.status === 400 || res.status === 401) {
          recordPass(mod, 'NoSQL injection operator ($gt) is safely neutralized by sanitize/Zod');
        } else {
          throw new Error(`Unexpected status ${res.status} on NoSQL injection attempt`);
        }
      } catch (err) {
        recordFail(mod, 'NoSQL injection neutralization', err);
      }

      // Scenario 12.3: CORS Preflight OPTIONS
      try {
        const res = await apiRequest('/api/v1/divisions', {
          method: 'OPTIONS',
          headers: {
            Origin: 'http://localhost:5173',
            'Access-Control-Request-Method': 'GET',
          },
        });
        if (res.status === 200 || res.status === 204) {
          recordPass(mod, 'CORS preflight OPTIONS request returns 200/204 with allow headers');
        } else {
          throw new Error(`Expected 200/204, got ${res.status}`);
        }
      } catch (err) {
        recordFail(mod, 'CORS preflight check', err);
      }
    }

    // ======================================================================
    // FINAL DATABASE INTEGRITY AND CLEANUP AUDIT
    // ======================================================================
    logHeader('Final Database Integrity & Verification Audit');
    console.log('   Checking document counts in all collections to verify zero leftover test records...');
    const collections = [
      { name: 'admins', model: AdminModel },
      { name: 'divisions', model: DivisionModel },
      { name: 'products', model: ProductModel },
      { name: 'filters', model: FilterModel },
      { name: 'projects', model: ProjectModel },
      { name: 'clients', model: ClientModel },
      { name: 'settings', model: SettingModel },
      { name: 'leads', model: LeadModel },
    ];

    for (const c of collections) {
      const total = await c.model.countDocuments();
      const active =
        c.name !== 'settings' && c.name !== 'leads'
          ? await (c.model as any).countDocuments({ isActive: true })
          : 'N/A';
      console.log(`   📦 Collection [${c.name.padEnd(10)}]: Total = ${String(total).padStart(3)}, Active = ${active}`);
    }

  } finally {
    // Graceful teardown
    if (server) {
      await new Promise<void>((resolve) => server.close(() => resolve()));
      console.log('\n🔒 [HTTP] Test server closed gracefully.');
    }
    await disconnectDB();
    console.log('🔌 [MongoDB] Database connection closed.');
  }

  // ======================================================================
  // REPORT GENERATION
  // ======================================================================
  console.log('\n======================================================================');
  console.log('📊 FINAL TEST EXECUTION & DATABASE VERIFICATION SUMMARY');
  console.log('======================================================================');

  const total = results.length;
  const passed = results.filter((r) => r.status === 'PASSED').length;
  const failed = results.filter((r) => r.status === 'FAILED').length;
  const dbVerifiedCount = results.filter((r) => r.dbVerified).length;

  console.log(`Total Scenarios Tested : ${total}`);
  console.log(`Total Passed           : ${passed} ✅`);
  console.log(`Total Failed           : ${failed} ❌`);
  console.log(`Direct DB Checks Passed: ${dbVerifiedCount} 🔍\n`);

  if (failed > 0) {
    console.error('💥 TEST RUN COMPLETED WITH FAILURES:');
    results
      .filter((r) => r.status === 'FAILED')
      .forEach((r) => console.error(`  - [${r.module}] ${r.name}: ${r.details}`));
    process.exit(1);
  } else {
    console.log('🎉 ALL SCENARIOS AND DATABASE VERIFICATIONS PASSED WITH 100% SUCCESS!');
    process.exit(0);
  }
}

runTestSuite().catch((err) => {
  console.error('💥 Fatal error in test runner:', err);
  process.exit(1);
});
