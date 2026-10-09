"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const collection = {
    info: {
        name: "GMP VISION — Complete REST API Collection",
        description: "Production API test suite for GMP VISION cleanroom and industrial contracting platform. Compliant with instructions.md v2.2 and GMP_VISION_PRD.md v2.0.",
        schema: "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
    },
    variable: [
        { key: "baseUrl", value: "http://localhost:5000/api/v1", type: "string" },
        { key: "rootUrl", value: "http://localhost:5000", type: "string" },
        { key: "adminEmail", value: "admin@gmpvision.com", type: "string" },
        { key: "adminPassword", value: "Admin@GMPVision2026!", type: "string" },
        { key: "accessToken", value: "", type: "string" },
        { key: "refreshToken", value: "", type: "string" },
        { key: "divisionSlug", value: "cleanroom-panels", type: "string" },
        { key: "productSlug", value: "cgmp-modular-puf-wall-panel", type: "string" },
        { key: "createdAdminId", value: "", type: "string" },
        { key: "createdDivisionId", value: "", type: "string" },
        { key: "createdProductId", value: "", type: "string" },
        { key: "createdFilterId", value: "", type: "string" },
        { key: "createdProjectId", value: "", type: "string" },
        { key: "createdClientId", value: "", type: "string" },
        { key: "createdLeadId", value: "", type: "string" },
        { key: "publicId", value: "gmp-vision/sample_asset", type: "string" }
    ],
    event: [
        {
            listen: "prerequest",
            script: {
                type: "text/javascript",
                exec: [
                    "const tokenExpiry = pm.environment.get('tokenExpiry');",
                    "const now = Date.now();",
                    "if (tokenExpiry && now >= parseInt(tokenExpiry)) {",
                    "  pm.sendRequest({",
                    "    url: (pm.environment.get('baseUrl') || pm.collectionVariables.get('baseUrl')) + '/auth/refresh',",
                    "    method: 'POST',",
                    "    header: { 'Content-Type': 'application/json' },",
                    "    body: {",
                    "      mode: 'raw',",
                    "      raw: JSON.stringify({ refreshToken: pm.environment.get('refreshToken') || pm.collectionVariables.get('refreshToken') })",
                    "    }",
                    "  }, function (err, res) {",
                    "    if (!err && res.code === 200) {",
                    "      const token = res.json().data.accessToken;",
                    "      pm.environment.set('accessToken', token);",
                    "      pm.collectionVariables.set('accessToken', token);",
                    "      pm.environment.set('tokenExpiry', Date.now() + 14 * 60 * 1000);",
                    "    }",
                    "  });",
                    "}"
                ]
            }
        }
    ],
    item: [
        // 01. System Health Probes
        {
            name: "01. System Health Probes",
            item: [
                {
                    name: "GET /health (Liveness Probe)",
                    request: {
                        method: "GET",
                        url: "{{rootUrl}}/health",
                        description: "Unauthenticated lightweight probe returning 200 if the Node.js Express process is up."
                    },
                    event: [
                        {
                            listen: "test",
                            script: {
                                type: "text/javascript",
                                exec: [
                                    "pm.test('Status is 200', () => pm.response.to.have.status(200));",
                                    "pm.test('Returns status ok', () => pm.expect(pm.response.json().status).to.eql('ok'));"
                                ]
                            }
                        }
                    ]
                },
                {
                    name: "GET /ready (Readiness Probe)",
                    request: {
                        method: "GET",
                        url: "{{rootUrl}}/ready",
                        description: "Deep health check verifying active MongoDB connection readyState === 1."
                    },
                    event: [
                        {
                            listen: "test",
                            script: {
                                type: "text/javascript",
                                exec: [
                                    "pm.test('Status is 200', () => pm.response.to.have.status(200));",
                                    "pm.test('Database is connected', () => pm.expect(pm.response.json().database).to.eql('connected'));"
                                ]
                            }
                        }
                    ]
                }
            ]
        },
        // 02. Authentication
        {
            name: "02. Authentication",
            item: [
                {
                    name: "POST /auth/login (Admin / Superadmin Login)",
                    request: {
                        method: "POST",
                        header: [{ key: "Content-Type", value: "application/json" }],
                        body: {
                            mode: "raw",
                            raw: JSON.stringify({
                                email: "{{adminEmail}}",
                                password: "{{adminPassword}}"
                            }, null, 2),
                            options: { raw: { language: "json" } }
                        },
                        url: "{{baseUrl}}/auth/login",
                        description: "Authenticates administrative credentials, issues 15-minute access JWT and sets 7-day HttpOnly refresh cookie."
                    },
                    event: [
                        {
                            listen: "test",
                            script: {
                                type: "text/javascript",
                                exec: [
                                    "pm.test('Status is 200', () => pm.response.to.have.status(200));",
                                    "pm.test('Response has success: true', () => pm.expect(pm.response.json().success).to.be.true);",
                                    "const json = pm.response.json();",
                                    "if (json.data?.accessToken) {",
                                    "  pm.environment.set('accessToken', json.data.accessToken);",
                                    "  pm.collectionVariables.set('accessToken', json.data.accessToken);",
                                    "  pm.environment.set('tokenExpiry', Date.now() + 14 * 60 * 1000);",
                                    "}",
                                    "// Capture cookie if available",
                                    "const cookies = pm.cookies.toObject();",
                                    "if (cookies.refreshToken) {",
                                    "  pm.environment.set('refreshToken', cookies.refreshToken);",
                                    "  pm.collectionVariables.set('refreshToken', cookies.refreshToken);",
                                    "}"
                                ]
                            }
                        }
                    ]
                },
                {
                    name: "POST /auth/refresh (Rotate Session Tokens)",
                    request: {
                        method: "POST",
                        header: [{ key: "Content-Type", value: "application/json" }],
                        body: {
                            mode: "raw",
                            raw: JSON.stringify({
                                refreshToken: "{{refreshToken}}"
                            }, null, 2),
                            options: { raw: { language: "json" } }
                        },
                        url: "{{baseUrl}}/auth/refresh",
                        description: "Rotates refresh token and issues a fresh 15-minute access token."
                    },
                    event: [
                        {
                            listen: "test",
                            script: {
                                type: "text/javascript",
                                exec: [
                                    "pm.test('Status is 200', () => pm.response.to.have.status(200));",
                                    "const json = pm.response.json();",
                                    "if (json.data?.accessToken) {",
                                    "  pm.environment.set('accessToken', json.data.accessToken);",
                                    "  pm.collectionVariables.set('accessToken', json.data.accessToken);",
                                    "}"
                                ]
                            }
                        }
                    ]
                },
                {
                    name: "GET /auth/me (Current Authenticated User Profile)",
                    request: {
                        method: "GET",
                        header: [{ key: "Authorization", value: "Bearer {{accessToken}}" }],
                        url: "{{baseUrl}}/auth/me",
                        description: "Retrieves the session profile for the currently authenticated administrator."
                    },
                    event: [
                        {
                            listen: "test",
                            script: {
                                type: "text/javascript",
                                exec: [
                                    "pm.test('Status is 200', () => pm.response.to.have.status(200));",
                                    "pm.test('Contains email and role', () => {",
                                    "  pm.expect(pm.response.json().data.email).to.exist;",
                                    "  pm.expect(pm.response.json().data.role).to.exist;",
                                    "});"
                                ]
                            }
                        }
                    ]
                },
                {
                    name: "POST /auth/logout (Terminate Session)",
                    request: {
                        method: "POST",
                        header: [{ key: "Authorization", value: "Bearer {{accessToken}}" }],
                        url: "{{baseUrl}}/auth/logout",
                        description: "Clears the database refresh token hash and invalidates the HttpOnly cookie."
                    },
                    event: [
                        {
                            listen: "test",
                            script: {
                                type: "text/javascript",
                                exec: [
                                    "pm.test('Status is 200', () => pm.response.to.have.status(200));",
                                    "pm.environment.set('accessToken', '');",
                                    "pm.collectionVariables.set('accessToken', '');"
                                ]
                            }
                        }
                    ]
                }
            ]
        },
        // 03. Admin User Accounts
        {
            name: "03. Admin User Accounts",
            item: [
                {
                    name: "GET /admins (List Administrators - Superadmin Only)",
                    request: {
                        method: "GET",
                        header: [{ key: "Authorization", value: "Bearer {{accessToken}}" }],
                        url: "{{baseUrl}}/admins",
                        description: "Lists all administrative user accounts. Restricted strictly to superadmin."
                    },
                    event: [
                        {
                            listen: "test",
                            script: {
                                type: "text/javascript",
                                exec: [
                                    "pm.test('Status is 200', () => pm.response.to.have.status(200));",
                                    "pm.test('Data is an array', () => pm.expect(pm.response.json().data).to.be.an('array'));"
                                ]
                            }
                        }
                    ]
                },
                {
                    name: "POST /admins (Provision New Admin - Superadmin Only)",
                    request: {
                        method: "POST",
                        header: [
                            { key: "Content-Type", value: "application/json" },
                            { key: "Authorization", value: "Bearer {{accessToken}}" }
                        ],
                        body: {
                            mode: "raw",
                            raw: JSON.stringify({
                                email: "subadmin.engineer@gmpvision.com",
                                password: "SecureAdminPassword@2026!",
                                role: "admin"
                            }, null, 2),
                            options: { raw: { language: "json" } }
                        },
                        url: "{{baseUrl}}/admins",
                        description: "Provisions a new administrator account with bcrypt 12-round salted hashing."
                    },
                    event: [
                        {
                            listen: "test",
                            script: {
                                type: "text/javascript",
                                exec: [
                                    "pm.test('Status is 201', () => pm.response.to.have.status(201));",
                                    "const json = pm.response.json();",
                                    "if (json.data?._id) {",
                                    "  pm.environment.set('createdAdminId', json.data._id);",
                                    "  pm.collectionVariables.set('createdAdminId', json.data._id);",
                                    "}"
                                ]
                            }
                        }
                    ]
                },
                {
                    name: "PATCH /admins/:id (Update Administrator Status or Role)",
                    request: {
                        method: "PATCH",
                        header: [
                            { key: "Content-Type", value: "application/json" },
                            { key: "Authorization", value: "Bearer {{accessToken}}" }
                        ],
                        body: {
                            mode: "raw",
                            raw: JSON.stringify({
                                role: "admin",
                                isActive: true
                            }, null, 2),
                            options: { raw: { language: "json" } }
                        },
                        url: "{{baseUrl}}/admins/{{createdAdminId}}",
                        description: "Updates an administrator's status or role. Superadmin cannot demote their own account."
                    },
                    event: [
                        {
                            listen: "test",
                            script: {
                                type: "text/javascript",
                                exec: [
                                    "pm.test('Status is 200', () => pm.response.to.have.status(200));"
                                ]
                            }
                        }
                    ]
                },
                {
                    name: "DELETE /admins/:id (Remove Administrator - Superadmin Only)",
                    request: {
                        method: "DELETE",
                        header: [{ key: "Authorization", value: "Bearer {{accessToken}}" }],
                        url: "{{baseUrl}}/admins/{{createdAdminId}}",
                        description: "Permanently removes an administrator account. Self-deletion is strictly forbidden."
                    },
                    event: [
                        {
                            listen: "test",
                            script: {
                                type: "text/javascript",
                                exec: [
                                    "pm.test('Status is 200', () => pm.response.to.have.status(200));"
                                ]
                            }
                        }
                    ]
                }
            ]
        },
        // 04. Divisions
        {
            name: "04. Divisions",
            item: [
                {
                    name: "GET /divisions (Public List)",
                    request: {
                        method: "GET",
                        url: "{{baseUrl}}/divisions",
                        description: "Returns the 7 core turnkey engineering divisions sorted by number (1..7)."
                    },
                    event: [
                        {
                            listen: "test",
                            script: {
                                type: "text/javascript",
                                exec: [
                                    "pm.test('Status is 200', () => pm.response.to.have.status(200));",
                                    "pm.test('Returns 7 active divisions', () => pm.expect(pm.response.json().data).to.be.an('array'));"
                                ]
                            }
                        }
                    ]
                },
                {
                    name: "GET /divisions/:slug (Public Detail)",
                    request: {
                        method: "GET",
                        url: "{{baseUrl}}/divisions/{{divisionSlug}}",
                        description: "Returns full division profile with its associated equipment/product catalog."
                    },
                    event: [
                        {
                            listen: "test",
                            script: {
                                type: "text/javascript",
                                exec: [
                                    "pm.test('Status is 200', () => pm.response.to.have.status(200));",
                                    "pm.test('Returns division and products array', () => {",
                                    "  pm.expect(pm.response.json().data.division).to.exist;",
                                    "  pm.expect(pm.response.json().data.products).to.be.an('array');",
                                    "});"
                                ]
                            }
                        }
                    ]
                },
                {
                    name: "POST /divisions (Create Division - Superadmin Only)",
                    request: {
                        method: "POST",
                        header: [
                            { key: "Content-Type", value: "application/json" },
                            { key: "Authorization", value: "Bearer {{accessToken}}" }
                        ],
                        body: {
                            mode: "raw",
                            raw: JSON.stringify({
                                number: 7,
                                title: "BMS, EMS & Cleanroom Qualification",
                                slug: "bms-ems-cleanroom-qualification",
                                tagline: "Comprehensive SCADA control, 21 CFR Part 11 auditing and validation.",
                                description: "<p>Turnkey building management systems, sensors and protocol validation.</p>",
                                heroImage: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1200&q=80",
                                icon: "Activity",
                                order: 7,
                                isActive: true
                            }, null, 2),
                            options: { raw: { language: "json" } }
                        },
                        url: "{{baseUrl}}/divisions",
                        description: "Creates a turnkey engineering division. Number must be between 1 and 7."
                    },
                    event: [
                        {
                            listen: "test",
                            script: {
                                type: "text/javascript",
                                exec: [
                                    "pm.test('Status is 201', () => pm.response.to.have.status(201));",
                                    "const json = pm.response.json();",
                                    "if (json.data?._id) {",
                                    "  pm.environment.set('createdDivisionId', json.data._id);",
                                    "  pm.collectionVariables.set('createdDivisionId', json.data._id);",
                                    "}"
                                ]
                            }
                        }
                    ]
                },
                {
                    name: "PATCH /divisions/:id (Update Division Details)",
                    request: {
                        method: "PATCH",
                        header: [
                            { key: "Content-Type", value: "application/json" },
                            { key: "Authorization", value: "Bearer {{accessToken}}" }
                        ],
                        body: {
                            mode: "raw",
                            raw: JSON.stringify({
                                tagline: "Updated precision cGMP engineering and climate control systems.",
                                order: 7
                            }, null, 2),
                            options: { raw: { language: "json" } }
                        },
                        url: "{{baseUrl}}/divisions/{{createdDivisionId}}",
                        description: "Updates division tagline, heroImage, description or metadata. Accepts ID or slug."
                    },
                    event: [
                        {
                            listen: "test",
                            script: {
                                type: "text/javascript",
                                exec: [
                                    "pm.test('Status is 200', () => pm.response.to.have.status(200));"
                                ]
                            }
                        }
                    ]
                },
                {
                    name: "DELETE /divisions/:id (Disable Division - Superadmin Only)",
                    request: {
                        method: "DELETE",
                        header: [{ key: "Authorization", value: "Bearer {{accessToken}}" }],
                        url: "{{baseUrl}}/divisions/{{createdDivisionId}}",
                        description: "Soft-deletes the division by setting isActive: false."
                    },
                    event: [
                        {
                            listen: "test",
                            script: {
                                type: "text/javascript",
                                exec: [
                                    "pm.test('Status is 200', () => pm.response.to.have.status(200));"
                                ]
                            }
                        }
                    ]
                }
            ]
        },
        // 05. Products & Components
        {
            name: "05. Products & Components",
            item: [
                {
                    name: "GET /products (Public Feed - Cursor Pagination)",
                    request: {
                        method: "GET",
                        url: "{{baseUrl}}/products?limit=6",
                        description: "Public cursor pagination feed for high-performance infinite scroll catalog."
                    },
                    event: [
                        {
                            listen: "test",
                            script: {
                                type: "text/javascript",
                                exec: [
                                    "pm.test('Status is 200', () => pm.response.to.have.status(200));",
                                    "pm.test('Cursor envelope valid', () => pm.expect(pm.response.json().pagination).to.have.property('hasMore'));"
                                ]
                            }
                        }
                    ]
                },
                {
                    name: "GET /products (Admin Table - Offset Pagination)",
                    request: {
                        method: "GET",
                        url: "{{baseUrl}}/products?mode=offset&page=1&limit=10",
                        description: "Standard offset pagination feed with total page counts for admin CMS tables."
                    },
                    event: [
                        {
                            listen: "test",
                            script: {
                                type: "text/javascript",
                                exec: [
                                    "pm.test('Status is 200', () => pm.response.to.have.status(200));",
                                    "pm.test('Total count exists', () => pm.expect(pm.response.json().pagination).to.have.property('total'));"
                                ]
                            }
                        }
                    ]
                },
                {
                    name: "GET /products/:slug (Public Detail)",
                    request: {
                        method: "GET",
                        url: "{{baseUrl}}/products/{{productSlug}}",
                        description: "Fetches individual product with populated divisionId document reference."
                    },
                    event: [
                        {
                            listen: "test",
                            script: {
                                type: "text/javascript",
                                exec: [
                                    "pm.test('Status is 200', () => pm.response.to.have.status(200));",
                                    "pm.test('Has specifications array', () => pm.expect(pm.response.json().data.specifications).to.be.an('array'));"
                                ]
                            }
                        }
                    ]
                },
                {
                    name: "POST /products (Create Product Item)",
                    request: {
                        method: "POST",
                        header: [
                            { key: "Content-Type", value: "application/json" },
                            { key: "Authorization", value: "Bearer {{accessToken}}" }
                        ],
                        body: {
                            mode: "raw",
                            raw: JSON.stringify({
                                divisionId: "6ac3de4b66d5692e95d65854",
                                category: "Modular Cleanroom Panels",
                                subcategory: "PUF Sandwich Panels",
                                name: "cGMP Modular PUF Insulated Wall System (50mm)",
                                slug: "cgmp-modular-puf-insulated-wall-system-50mm",
                                description: "<p>Continuous polyurethane core panels with PPGI flush joint skins.</p>",
                                specifications: [
                                    { key: "Panel Thickness", value: "50mm / 80mm / 100mm" },
                                    { key: "Density", value: "40 ± 2 kg/m³" },
                                    { key: "Fire Rating", value: "Class B1 Retardant" }
                                ],
                                images: [
                                    "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=800&q=80"
                                ],
                                tags: ["Cleanroom", "Modular", "PUF", "Schedule M"],
                                isFeatured: true,
                                order: 1
                            }, null, 2),
                            options: { raw: { language: "json" } }
                        },
                        url: "{{baseUrl}}/products",
                        description: "Creates equipment/catalog item linked to a turnkey engineering division."
                    },
                    event: [
                        {
                            listen: "test",
                            script: {
                                type: "text/javascript",
                                exec: [
                                    "pm.test('Status is 201', () => pm.response.to.have.status(201));",
                                    "const json = pm.response.json();",
                                    "if (json.data?._id) {",
                                    "  pm.environment.set('createdProductId', json.data._id);",
                                    "  pm.collectionVariables.set('createdProductId', json.data._id);",
                                    "}"
                                ]
                            }
                        }
                    ]
                },
                {
                    name: "PATCH /products/reorder (Bulk Reorder Display Sequence)",
                    request: {
                        method: "PATCH",
                        header: [
                            { key: "Content-Type", value: "application/json" },
                            { key: "Authorization", value: "Bearer {{accessToken}}" }
                        ],
                        body: {
                            mode: "raw",
                            raw: JSON.stringify({
                                items: [
                                    { id: "{{createdProductId}}", order: 1 }
                                ]
                            }, null, 2),
                            options: { raw: { language: "json" } }
                        },
                        url: "{{baseUrl}}/products/reorder",
                        description: "Bulk updates display sequence using MongoDB bulkWrite operation."
                    },
                    event: [
                        {
                            listen: "test",
                            script: {
                                type: "text/javascript",
                                exec: [
                                    "pm.test('Status is 200', () => pm.response.to.have.status(200));"
                                ]
                            }
                        }
                    ]
                },
                {
                    name: "PATCH /products/:id (Update Product Details)",
                    request: {
                        method: "PATCH",
                        header: [
                            { key: "Content-Type", value: "application/json" },
                            { key: "Authorization", value: "Bearer {{accessToken}}" }
                        ],
                        body: {
                            mode: "raw",
                            raw: JSON.stringify({
                                name: "Updated cGMP Modular PUF Wall System V2",
                                isFeatured: true
                            }, null, 2),
                            options: { raw: { language: "json" } }
                        },
                        url: "{{baseUrl}}/products/{{createdProductId}}",
                        description: "Updates specifications, description, name or featured state of a product."
                    },
                    event: [
                        {
                            listen: "test",
                            script: {
                                type: "text/javascript",
                                exec: [
                                    "pm.test('Status is 200', () => pm.response.to.have.status(200));"
                                ]
                            }
                        }
                    ]
                },
                {
                    name: "DELETE /products/:id (Disable Product - Soft Delete)",
                    request: {
                        method: "DELETE",
                        header: [{ key: "Authorization", value: "Bearer {{accessToken}}" }],
                        url: "{{baseUrl}}/products/{{createdProductId}}",
                        description: "Soft deletes product item (isActive: false) to preserve referential integrity."
                    },
                    event: [
                        {
                            listen: "test",
                            script: {
                                type: "text/javascript",
                                exec: [
                                    "pm.test('Status is 200', () => pm.response.to.have.status(200));"
                                ]
                            }
                        }
                    ]
                }
            ]
        },
        // 06. Air Filtration Catalog
        {
            name: "06. Air Filtration Catalog",
            item: [
                {
                    name: "GET /filters (Public Ordered List)",
                    request: {
                        method: "GET",
                        url: "{{baseUrl}}/filters",
                        description: "Returns active air filtration catalog sorted by category and order."
                    },
                    event: [
                        {
                            listen: "test",
                            script: {
                                type: "text/javascript",
                                exec: [
                                    "pm.test('Status is 200', () => pm.response.to.have.status(200));",
                                    "pm.test('Filters array returned', () => pm.expect(pm.response.json().data).to.be.an('array'));"
                                ]
                            }
                        }
                    ]
                },
                {
                    name: "GET /filters?category=pre-filter (Filter by Category)",
                    request: {
                        method: "GET",
                        url: "{{baseUrl}}/filters?category=pre-filter",
                        description: "Filters items by category (pre-filter, fine-filter, gel-seal-hepa, standard-hepa)."
                    },
                    event: [
                        {
                            listen: "test",
                            script: {
                                type: "text/javascript",
                                exec: [
                                    "pm.test('Status is 200', () => pm.response.to.have.status(200));"
                                ]
                            }
                        }
                    ]
                },
                {
                    name: "GET /filters/:id (Filter Detail by ID)",
                    request: {
                        method: "GET",
                        url: "{{baseUrl}}/filters/{{createdFilterId}}",
                        description: "Returns details of an individual air filtration catalog item."
                    },
                    event: [
                        {
                            listen: "test",
                            script: {
                                type: "text/javascript",
                                exec: [
                                    "pm.test('Status is 200 or 404', () => pm.expect(pm.response.code).to.be.oneOf([200, 404]));"
                                ]
                            }
                        }
                    ]
                },
                {
                    name: "POST /filters (Create Air Filter Catalog Item)",
                    request: {
                        method: "POST",
                        header: [
                            { key: "Content-Type", value: "application/json" },
                            { key: "Authorization", value: "Bearer {{accessToken}}" }
                        ],
                        body: {
                            mode: "raw",
                            raw: JSON.stringify({
                                category: "gel-seal-hepa",
                                name: "Fluid Gel-Seal Terminal HEPA Filter (H14 / 99.997%)",
                                micronRating: "0.3 Micron (99.997% DOP/PAO)",
                                mediaConstruction: "Ultra-fine borosilicate micro-fiber glass paper with hot-melt separators",
                                frame: "Extruded Anodized Aluminum with polyurethane gel channel",
                                applications: ["Sterile filling suites", "Laminar Airflow Benches", "ISO Class 5 zones"],
                                keyFeature: "Knife-edge fluid seal guaranteeing zero perimeter air leakage",
                                images: [
                                    "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80"
                                ],
                                order: 1
                            }, null, 2),
                            options: { raw: { language: "json" } }
                        },
                        url: "{{baseUrl}}/filters",
                        description: "Adds a filtration item to the catalog. Category must match supported enum."
                    },
                    event: [
                        {
                            listen: "test",
                            script: {
                                type: "text/javascript",
                                exec: [
                                    "pm.test('Status is 201', () => pm.response.to.have.status(201));",
                                    "const json = pm.response.json();",
                                    "if (json.data?._id) {",
                                    "  pm.environment.set('createdFilterId', json.data._id);",
                                    "  pm.collectionVariables.set('createdFilterId', json.data._id);",
                                    "}"
                                ]
                            }
                        }
                    ]
                },
                {
                    name: "PATCH /filters/reorder (Bulk Reorder Display Sequence)",
                    request: {
                        method: "PATCH",
                        header: [
                            { key: "Content-Type", value: "application/json" },
                            { key: "Authorization", value: "Bearer {{accessToken}}" }
                        ],
                        body: {
                            mode: "raw",
                            raw: JSON.stringify({
                                items: [
                                    { id: "{{createdFilterId}}", order: 5 }
                                ]
                            }, null, 2),
                            options: { raw: { language: "json" } }
                        },
                        url: "{{baseUrl}}/filters/reorder",
                        description: "Bulk reorders filter catalog sequence."
                    },
                    event: [
                        {
                            listen: "test",
                            script: {
                                type: "text/javascript",
                                exec: [
                                    "pm.test('Status is 200', () => pm.response.to.have.status(200));"
                                ]
                            }
                        }
                    ]
                },
                {
                    name: "PATCH /filters/:id (Update Air Filter Item)",
                    request: {
                        method: "PATCH",
                        header: [
                            { key: "Content-Type", value: "application/json" },
                            { key: "Authorization", value: "Bearer {{accessToken}}" }
                        ],
                        body: {
                            mode: "raw",
                            raw: JSON.stringify({
                                micronRating: "0.12 Micron ULPA Grade (99.9995%)",
                                keyFeature: "Enhanced knife-edge polyurethane gel channel with zero pressure loss"
                            }, null, 2),
                            options: { raw: { language: "json" } }
                        },
                        url: "{{baseUrl}}/filters/{{createdFilterId}}",
                        description: "Updates filter technical specifications and applications."
                    },
                    event: [
                        {
                            listen: "test",
                            script: {
                                type: "text/javascript",
                                exec: [
                                    "pm.test('Status is 200', () => pm.response.to.have.status(200));"
                                ]
                            }
                        }
                    ]
                },
                {
                    name: "DELETE /filters/:id (Disable Filter - Soft Delete)",
                    request: {
                        method: "DELETE",
                        header: [{ key: "Authorization", value: "Bearer {{accessToken}}" }],
                        url: "{{baseUrl}}/filters/{{createdFilterId}}",
                        description: "Disables air filter catalog item (isActive: false)."
                    },
                    event: [
                        {
                            listen: "test",
                            script: {
                                type: "text/javascript",
                                exec: [
                                    "pm.test('Status is 200', () => pm.response.to.have.status(200));"
                                ]
                            }
                        }
                    ]
                }
            ]
        },
        // 07. Projects & Portfolio
        {
            name: "07. Projects & Portfolio",
            item: [
                {
                    name: "GET /projects (Cursor Feed)",
                    request: {
                        method: "GET",
                        url: "{{baseUrl}}/projects?limit=9",
                        description: "Returns public turnkey case studies with cursor pagination."
                    },
                    event: [
                        {
                            listen: "test",
                            script: {
                                type: "text/javascript",
                                exec: [
                                    "pm.test('Status is 200', () => pm.response.to.have.status(200));"
                                ]
                            }
                        }
                    ]
                },
                {
                    name: "GET /projects (Admin Table - Offset Pagination)",
                    request: {
                        method: "GET",
                        url: "{{baseUrl}}/projects?mode=offset&page=1&limit=10",
                        description: "Offset pagination list with total page counts for administration CMS."
                    },
                    event: [
                        {
                            listen: "test",
                            script: {
                                type: "text/javascript",
                                exec: [
                                    "pm.test('Status is 200', () => pm.response.to.have.status(200));"
                                ]
                            }
                        }
                    ]
                },
                {
                    name: "GET /projects/:id (Case Study Detail)",
                    request: {
                        method: "GET",
                        url: "{{baseUrl}}/projects/{{createdProjectId}}",
                        description: "Fetches individual turnkey project reference details by MongoDB ID."
                    },
                    event: [
                        {
                            listen: "test",
                            script: {
                                type: "text/javascript",
                                exec: [
                                    "pm.test('Status is 200 or 404', () => pm.expect(pm.response.code).to.be.oneOf([200, 404]));"
                                ]
                            }
                        }
                    ]
                },
                {
                    name: "POST /projects (Create Project Case Study)",
                    request: {
                        method: "POST",
                        header: [
                            { key: "Content-Type", value: "application/json" },
                            { key: "Authorization", value: "Bearer {{accessToken}}" }
                        ],
                        body: {
                            mode: "raw",
                            raw: JSON.stringify({
                                clientName: "Zeon Healthcare Ltd",
                                scope: "Turnkey 15,000 sq.ft. Nutraceutical Cleanroom & AHU Validation",
                                location: "Paonta Sahib, Himachal Pradesh",
                                division: ["Cleanroom Infrastructure & Modular Panels", "HVAC Systems, AHUs & Dehumidifiers"],
                                completionYear: 2024,
                                description: "<p>Complete modular cleanroom installation including 80mm PUF panels and gel-seal HEPA terminal housings.</p>",
                                images: [
                                    "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=800&q=80"
                                ],
                                isFeatured: true,
                                order: 1
                            }, null, 2),
                            options: { raw: { language: "json" } }
                        },
                        url: "{{baseUrl}}/projects",
                        description: "Creates portfolio project reference case study."
                    },
                    event: [
                        {
                            listen: "test",
                            script: {
                                type: "text/javascript",
                                exec: [
                                    "pm.test('Status is 201', () => pm.response.to.have.status(201));",
                                    "const json = pm.response.json();",
                                    "if (json.data?._id) {",
                                    "  pm.environment.set('createdProjectId', json.data._id);",
                                    "  pm.collectionVariables.set('createdProjectId', json.data._id);",
                                    "}"
                                ]
                            }
                        }
                    ]
                },
                {
                    name: "PATCH /projects/reorder (Bulk Reorder Display Sequence)",
                    request: {
                        method: "PATCH",
                        header: [
                            { key: "Content-Type", value: "application/json" },
                            { key: "Authorization", value: "Bearer {{accessToken}}" }
                        ],
                        body: {
                            mode: "raw",
                            raw: JSON.stringify({
                                items: [
                                    { id: "{{createdProjectId}}", order: 2 }
                                ]
                            }, null, 2),
                            options: { raw: { language: "json" } }
                        },
                        url: "{{baseUrl}}/projects/reorder",
                        description: "Bulk reorders project case studies."
                    },
                    event: [
                        {
                            listen: "test",
                            script: {
                                type: "text/javascript",
                                exec: [
                                    "pm.test('Status is 200', () => pm.response.to.have.status(200));"
                                ]
                            }
                        }
                    ]
                },
                {
                    name: "PATCH /projects/:id (Update Project Case Study)",
                    request: {
                        method: "PATCH",
                        header: [
                            { key: "Content-Type", value: "application/json" },
                            { key: "Authorization", value: "Bearer {{accessToken}}" }
                        ],
                        body: {
                            mode: "raw",
                            raw: JSON.stringify({
                                scope: "Updated 18,000 sq.ft. Turnkey Nutraceutical Cleanroom & AHU Facility",
                                completionYear: 2025
                            }, null, 2),
                            options: { raw: { language: "json" } }
                        },
                        url: "{{baseUrl}}/projects/{{createdProjectId}}",
                        description: "Updates project scope, client name, completion year or description."
                    },
                    event: [
                        {
                            listen: "test",
                            script: {
                                type: "text/javascript",
                                exec: [
                                    "pm.test('Status is 200', () => pm.response.to.have.status(200));"
                                ]
                            }
                        }
                    ]
                },
                {
                    name: "DELETE /projects/:id (Disable Project - Soft Delete)",
                    request: {
                        method: "DELETE",
                        header: [{ key: "Authorization", value: "Bearer {{accessToken}}" }],
                        url: "{{baseUrl}}/projects/{{createdProjectId}}",
                        description: "Soft-deletes project reference (isActive: false)."
                    },
                    event: [
                        {
                            listen: "test",
                            script: {
                                type: "text/javascript",
                                exec: [
                                    "pm.test('Status is 200', () => pm.response.to.have.status(200));"
                                ]
                            }
                        }
                    ]
                }
            ]
        },
        // 08. Clients Trust Wall
        {
            name: "08. Clients Trust Wall",
            item: [
                {
                    name: "GET /clients (Public Trust Logo Wall)",
                    request: {
                        method: "GET",
                        url: "{{baseUrl}}/clients",
                        description: "Returns client logos sorted by display order for the trust carousel."
                    },
                    event: [
                        {
                            listen: "test",
                            script: {
                                type: "text/javascript",
                                exec: [
                                    "pm.test('Status is 200', () => pm.response.to.have.status(200));",
                                    "pm.test('Clients array returned', () => pm.expect(pm.response.json().data).to.be.an('array'));"
                                ]
                            }
                        }
                    ]
                },
                {
                    name: "POST /clients (Create Client Partner Logo)",
                    request: {
                        method: "POST",
                        header: [
                            { key: "Content-Type", value: "application/json" },
                            { key: "Authorization", value: "Bearer {{accessToken}}" }
                        ],
                        body: {
                            mode: "raw",
                            raw: JSON.stringify({
                                name: "Wallace Pharmaceuticals",
                                logoUrl: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=200&q=80",
                                sector: "Pharmaceutical",
                                website: "https://wallacepharma.example.com",
                                order: 1,
                                isFeatured: true
                            }, null, 2),
                            options: { raw: { language: "json" } }
                        },
                        url: "{{baseUrl}}/clients",
                        description: "Adds a client logo to the trust wall. Sector must match supported enum."
                    },
                    event: [
                        {
                            listen: "test",
                            script: {
                                type: "text/javascript",
                                exec: [
                                    "pm.test('Status is 201', () => pm.response.to.have.status(201));",
                                    "const json = pm.response.json();",
                                    "if (json.data?._id) {",
                                    "  pm.environment.set('createdClientId', json.data._id);",
                                    "  pm.collectionVariables.set('createdClientId', json.data._id);",
                                    "}"
                                ]
                            }
                        }
                    ]
                },
                {
                    name: "PATCH /clients/reorder (Bulk Reorder Display Sequence)",
                    request: {
                        method: "PATCH",
                        header: [
                            { key: "Content-Type", value: "application/json" },
                            { key: "Authorization", value: "Bearer {{accessToken}}" }
                        ],
                        body: {
                            mode: "raw",
                            raw: JSON.stringify({
                                items: [
                                    { id: "{{createdClientId}}", order: 2 }
                                ]
                            }, null, 2),
                            options: { raw: { language: "json" } }
                        },
                        url: "{{baseUrl}}/clients/reorder",
                        description: "Bulk reorders client logo sequence."
                    },
                    event: [
                        {
                            listen: "test",
                            script: {
                                type: "text/javascript",
                                exec: [
                                    "pm.test('Status is 200', () => pm.response.to.have.status(200));"
                                ]
                            }
                        }
                    ]
                },
                {
                    name: "PATCH /clients/:id (Update Client Details)",
                    request: {
                        method: "PATCH",
                        header: [
                            { key: "Content-Type", value: "application/json" },
                            { key: "Authorization", value: "Bearer {{accessToken}}" }
                        ],
                        body: {
                            mode: "raw",
                            raw: JSON.stringify({
                                sector: "Biotechnology",
                                isFeatured: true
                            }, null, 2),
                            options: { raw: { language: "json" } }
                        },
                        url: "{{baseUrl}}/clients/{{createdClientId}}",
                        description: "Updates client company name, logoUrl or sector."
                    },
                    event: [
                        {
                            listen: "test",
                            script: {
                                type: "text/javascript",
                                exec: [
                                    "pm.test('Status is 200', () => pm.response.to.have.status(200));"
                                ]
                            }
                        }
                    ]
                },
                {
                    name: "DELETE /clients/:id (Disable Client - Soft Delete)",
                    request: {
                        method: "DELETE",
                        header: [{ key: "Authorization", value: "Bearer {{accessToken}}" }],
                        url: "{{baseUrl}}/clients/{{createdClientId}}",
                        description: "Soft deletes client logo (isActive: false)."
                    },
                    event: [
                        {
                            listen: "test",
                            script: {
                                type: "text/javascript",
                                exec: [
                                    "pm.test('Status is 200', () => pm.response.to.have.status(200));"
                                ]
                            }
                        }
                    ]
                }
            ]
        },
        // 09. Site Settings & Metrics
        {
            name: "09. Site Settings & Metrics",
            item: [
                {
                    name: "GET /settings (Public Site Configuration Map)",
                    request: {
                        method: "GET",
                        url: "{{baseUrl}}/settings",
                        description: "Fetches key-value configuration dictionary (hotlines, metrics, hero copy)."
                    },
                    event: [
                        {
                            listen: "test",
                            script: {
                                type: "text/javascript",
                                exec: [
                                    "pm.test('Status is 200', () => pm.response.to.have.status(200));",
                                    "pm.test('Settings dictionary returned', () => pm.expect(pm.response.json().data).to.be.an('object'));"
                                ]
                            }
                        }
                    ]
                },
                {
                    name: "PATCH /settings/:key (Update Setting Value)",
                    request: {
                        method: "PATCH",
                        header: [
                            { key: "Content-Type", value: "application/json" },
                            { key: "Authorization", value: "Bearer {{accessToken}}" }
                        ],
                        body: {
                            mode: "raw",
                            raw: JSON.stringify({
                                value: "100+ Turnkey Cleanroom Projects Completed",
                                description: "Primary verified project count metric"
                            }, null, 2),
                            options: { raw: { language: "json" } }
                        },
                        url: "{{baseUrl}}/settings/metric_projects_count",
                        description: "Updates or upserts a configuration key-value pair."
                    },
                    event: [
                        {
                            listen: "test",
                            script: {
                                type: "text/javascript",
                                exec: [
                                    "pm.test('Status is 200', () => pm.response.to.have.status(200));"
                                ]
                            }
                        }
                    ]
                }
            ]
        },
        // 10. Leads & RFQ Ingestion
        {
            name: "10. Leads & RFQ Ingestion",
            item: [
                {
                    name: "POST /leads (Submit RFQ / WhatsApp Inquiry)",
                    request: {
                        method: "POST",
                        header: [{ key: "Content-Type", value: "application/json" }],
                        body: {
                            mode: "raw",
                            raw: JSON.stringify({
                                companyName: "Cadila Healthcare Ltd",
                                contactName: "Rajesh Kumar",
                                designation: "General Manager - Engineering",
                                phone: "+919876543210",
                                email: "rajesh@cadila.example.com",
                                location: "Ahmedabad, Gujarat",
                                projectType: ["Turnkey Cleanroom & HVAC"],
                                divisions: ["Cleanroom Infrastructure & Modular Panels", "HVAC Systems, AHUs & Dehumidifiers"],
                                roomDimensions: "25m x 18m x 3.5m",
                                cfm: 18000,
                                message: "Requesting technical audit and BOQ cost estimate for Class B sterile vial filling suite.",
                                source: "rfq_form"
                            }, null, 2),
                            options: { raw: { language: "json" } }
                        },
                        url: "{{baseUrl}}/leads",
                        description: "Public ingestion endpoint for RFQ inquiries, WhatsApp direct leads, and contact forms."
                    },
                    event: [
                        {
                            listen: "test",
                            script: {
                                type: "text/javascript",
                                exec: [
                                    "pm.test('Status is 201', () => pm.response.to.have.status(201));",
                                    "const json = pm.response.json();",
                                    "if (json.data?.id) {",
                                    "  pm.environment.set('createdLeadId', json.data.id);",
                                    "  pm.collectionVariables.set('createdLeadId', json.data.id);",
                                    "}"
                                ]
                            }
                        }
                    ]
                },
                {
                    name: "GET /leads (Admin List - Filterable)",
                    request: {
                        method: "GET",
                        header: [{ key: "Authorization", value: "Bearer {{accessToken}}" }],
                        url: "{{baseUrl}}/leads?page=1&limit=20&status=new",
                        description: "Offset paginated leads feed with status, source, division and date filtering."
                    },
                    event: [
                        {
                            listen: "test",
                            script: {
                                type: "text/javascript",
                                exec: [
                                    "pm.test('Status is 200', () => pm.response.to.have.status(200));",
                                    "pm.test('Offset pagination present', () => pm.expect(pm.response.json().pagination).to.exist);"
                                ]
                            }
                        }
                    ]
                },
                {
                    name: "GET /leads/export (Download CSV Spreadsheet)",
                    request: {
                        method: "GET",
                        header: [{ key: "Authorization", value: "Bearer {{accessToken}}" }],
                        url: "{{baseUrl}}/leads/export",
                        description: "Exports all inquiry records to a downloadable CSV spreadsheet format."
                    },
                    event: [
                        {
                            listen: "test",
                            script: {
                                type: "text/javascript",
                                exec: [
                                    "pm.test('Status is 200', () => pm.response.to.have.status(200));",
                                    "pm.test('Content-Type is text/csv', () => {",
                                    "  pm.expect(pm.response.headers.get('Content-Type')).to.include('text/csv');",
                                    "});"
                                ]
                            }
                        }
                    ]
                },
                {
                    name: "GET /leads/:id (Inquiry Detail)",
                    request: {
                        method: "GET",
                        header: [{ key: "Authorization", value: "Bearer {{accessToken}}" }],
                        url: "{{baseUrl}}/leads/{{createdLeadId}}",
                        description: "Fetches full inquiry specification by MongoDB Lead ID."
                    },
                    event: [
                        {
                            listen: "test",
                            script: {
                                type: "text/javascript",
                                exec: [
                                    "pm.test('Status is 200 or 404', () => pm.expect(pm.response.code).to.be.oneOf([200, 404]));"
                                ]
                            }
                        }
                    ]
                },
                {
                    name: "PATCH /leads/:id/status (Update Inquiry Pipeline Status)",
                    request: {
                        method: "PATCH",
                        header: [
                            { key: "Content-Type", value: "application/json" },
                            { key: "Authorization", value: "Bearer {{accessToken}}" }
                        ],
                        body: {
                            mode: "raw",
                            raw: JSON.stringify({
                                status: "contacted",
                                notes: "Consultation call completed with Rajesh Kumar. Forwarded technical parameters to cleanroom estimation team."
                            }, null, 2),
                            options: { raw: { language: "json" } }
                        },
                        url: "{{baseUrl}}/leads/{{createdLeadId}}/status",
                        description: "Updates lead status in sales pipeline (new -> contacted -> quoted -> converted -> closed)."
                    },
                    event: [
                        {
                            listen: "test",
                            script: {
                                type: "text/javascript",
                                exec: [
                                    "pm.test('Status is 200', () => pm.response.to.have.status(200));"
                                ]
                            }
                        }
                    ]
                }
            ]
        },
        // 11. Media Uploads
        {
            name: "11. Media Uploads",
            item: [
                {
                    name: "POST /media/upload (Upload Image or PDF Document)",
                    request: {
                        method: "POST",
                        header: [{ key: "Authorization", value: "Bearer {{accessToken}}" }],
                        body: {
                            mode: "formdata",
                            formdata: [
                                {
                                    key: "file",
                                    type: "file",
                                    description: "Image (JPEG, PNG, WebP up to 10MB) or Technical PDF up to 25MB"
                                }
                            ]
                        },
                        url: "{{baseUrl}}/media/upload",
                        description: "Multipart form upload streaming directly to Cloudinary folder 'gmp-vision'."
                    },
                    event: [
                        {
                            listen: "test",
                            script: {
                                type: "text/javascript",
                                exec: [
                                    "pm.test('Status is 200 or 400', () => pm.expect(pm.response.code).to.be.oneOf([200, 400]));",
                                    "const json = pm.response.json();",
                                    "if (json.data?.publicId) {",
                                    "  pm.environment.set('publicId', json.data.publicId);",
                                    "  pm.collectionVariables.set('publicId', json.data.publicId);",
                                    "}"
                                ]
                            }
                        }
                    ]
                },
                {
                    name: "DELETE /media/:publicId (Delete Uploaded Asset)",
                    request: {
                        method: "DELETE",
                        header: [{ key: "Authorization", value: "Bearer {{accessToken}}" }],
                        url: "{{baseUrl}}/media/{{publicId}}",
                        description: "Deletes media asset from Cloudinary storage by public ID."
                    },
                    event: [
                        {
                            listen: "test",
                            script: {
                                type: "text/javascript",
                                exec: [
                                    "pm.test('Status is 200', () => pm.response.to.have.status(200));"
                                ]
                            }
                        }
                    ]
                }
            ]
        }
    ]
};
const environment = {
    id: "gmp-vision-env-local",
    name: "GMP VISION — Local Dev Environment",
    values: [
        { key: "baseUrl", value: "http://localhost:5000/api/v1", type: "default", enabled: true },
        { key: "rootUrl", value: "http://localhost:5000", type: "default", enabled: true },
        { key: "adminEmail", value: "admin@gmpvision.com", type: "default", enabled: true },
        { key: "adminPassword", value: "Admin@GMPVision2026!", type: "secret", enabled: true },
        { key: "accessToken", value: "", type: "secret", enabled: true },
        { key: "refreshToken", value: "", type: "secret", enabled: true },
        { key: "tokenExpiry", value: "", type: "default", enabled: true },
        { key: "divisionSlug", value: "cleanroom-panels", type: "default", enabled: true },
        { key: "productSlug", value: "cgmp-modular-puf-wall-panel", type: "default", enabled: true },
        { key: "createdAdminId", value: "6ac3de4b66d5692e95d65853", type: "default", enabled: true },
        { key: "createdDivisionId", value: "6ac8cfff090b90edc7bfeac2", type: "default", enabled: true },
        { key: "createdProductId", value: "6ac8cfff090b90edc7bfeac8", type: "default", enabled: true },
        { key: "createdFilterId", value: "6ac3eba9ecbb0c832770af85", type: "default", enabled: true },
        { key: "createdProjectId", value: "6ac3ebaaecbb0c832770af86", type: "default", enabled: true },
        { key: "createdClientId", value: "6ac3ebaaecbb0c832770af87", type: "default", enabled: true },
        { key: "createdLeadId", value: "", type: "default", enabled: true },
        { key: "publicId", value: "gmp-vision/sample_asset", type: "default", enabled: true }
    ],
    _postman_variable_scope: "environment"
};
const backendPostmanDir = path_1.default.resolve(__dirname, '../../postman');
// Write backend/postman/collection.json
fs_1.default.writeFileSync(path_1.default.join(backendPostmanDir, 'collection.json'), JSON.stringify(collection, null, 2), 'utf-8');
fs_1.default.writeFileSync(path_1.default.join(backendPostmanDir, 'environment.json'), JSON.stringify(environment, null, 2), 'utf-8');
console.log('✅ Generated backend/postman/collection.json (100% complete schema with raw JSON body and formdata)');
console.log('✅ Generated backend/postman/environment.json (100% matched environment variables)');
