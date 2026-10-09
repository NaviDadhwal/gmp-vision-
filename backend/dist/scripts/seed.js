"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db_1 = require("../config/db");
const env_1 = require("../config/env");
const admin_model_1 = require("../modules/admins/admin.model");
const division_model_1 = require("../modules/divisions/division.model");
const product_model_1 = require("../modules/products/product.model");
const filter_model_1 = require("../modules/filters/filter.model");
const project_model_1 = require("../modules/projects/project.model");
const client_model_1 = require("../modules/clients/client.model");
const setting_model_1 = require("../modules/settings/setting.model");
async function seed() {
    console.log('🌱 [Seeder] Starting idempotent database seed...');
    await (0, db_1.connectDB)();
    try {
        // 1. Superadmin User
        const existingSuperadmin = await admin_model_1.AdminModel.findOne({ email: env_1.env.SUPERADMIN_EMAIL });
        if (!existingSuperadmin) {
            const passwordHash = await bcryptjs_1.default.hash(env_1.env.SUPERADMIN_PASSWORD, 12);
            await admin_model_1.AdminModel.create({
                email: env_1.env.SUPERADMIN_EMAIL,
                passwordHash,
                role: 'superadmin',
                isActive: true,
            });
            console.log(`✅ [Superadmin] Provisioned: ${env_1.env.SUPERADMIN_EMAIL}`);
        }
        else {
            console.log(`ℹ️ [Superadmin] Already exists: ${env_1.env.SUPERADMIN_EMAIL}`);
        }
        // 2. The 7 Turnkey Divisions (from WEBSITE_SERVICES_AND_CATALOG.md)
        const divisionsData = [
            {
                number: 1,
                title: 'Cleanroom Infrastructure & Modular Panels',
                slug: 'cleanroom-panels',
                tagline: 'Precision engineered modular cleanroom wall, ceiling, and door systems compliant with cGMP & ISO 14644.',
                description: '<p>Providing sterile, flush, airtight architectural enclosures compliant with cGMP, WHO-GMP, Schedule M, and ISO 14644-1. Modular PUF/PIR insulated sandwich panels with PPGI, PPGL, or SS 304 skins.</p>',
                icon: 'Layers',
                heroImage: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=1200&q=80',
                order: 1,
            },
            {
                number: 2,
                title: 'HVAC Systems, AHUs & Dehumidifiers',
                slug: 'hvac-ahu-systems',
                tagline: 'Custom engineered Air Handling Units, chillers, and precision climate control systems.',
                description: '<p>Complete thermal, humidity, and airflow control delivering strict pressure cascades and air changes per hour (ACPH) for ISO Class 5 to 8 environments.</p>',
                icon: 'Wind',
                heroImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
                order: 2,
            },
            {
                number: 3,
                title: 'Air Filtration & Terminal Housings',
                slug: 'air-filtration-systems',
                tagline: 'High-efficiency particulate filtration from Pre-Filters (G4) to Ultra-Low Penetration Air (U15).',
                description: '<p>Complete filtration cascade with factory DOP/PAO leak testing, fluid-seal HEPA housings, and dynamic terminal diffusers for contamination-free manufacturing.</p>',
                icon: 'ShieldCheck',
                heroImage: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80',
                order: 3,
            },
            {
                number: 4,
                title: 'Piping & Mechanical Fabrication',
                slug: 'piping-fabrication',
                tagline: 'High-purity orbital welded stainless steel process piping and utility networks.',
                description: '<p>Orbital welded SS 316L piping for Purified Water (PW), Water for Injection (WFI), Pure Steam (PS), and clean compressed air with full boroscopy documentation.</p>',
                icon: 'Wrench',
                heroImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
                order: 4,
            },
            {
                number: 5,
                title: 'Industrial Water Treatment Systems',
                slug: 'water-treatment',
                tagline: 'Purified Water (PW), RO-EDI generation plants, and wastewater recovery systems.',
                description: '<p>Turnkey water generation and storage loops compliant with USP and Ph. Eur. standards, featuring hot water sanitization and multi-pass reverse osmosis.</p>',
                icon: 'Droplets',
                heroImage: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
                order: 5,
            },
            {
                number: 6,
                title: 'Electrical Panels & Fire Protection',
                slug: 'electrical-fire-systems',
                tagline: 'Integrated low-voltage power distribution, MCC panels, cleanroom lighting, and fire systems.',
                description: '<p>Cleanroom-certified flush LED luminaires, modular electrical trunking, MCC/PCC automation boards, and addressable smoke & fire suppression networks.</p>',
                icon: 'Zap',
                heroImage: 'https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&w=1200&q=80',
                order: 6,
            },
            {
                number: 7,
                title: 'BMS, EMS & Validation Services',
                slug: 'bms-validation-services',
                tagline: 'SCADA automation, 21 CFR Part 11 environmental monitoring, and DQ/IQ/OQ/PQ validation.',
                description: '<p>Centralized Building Management Systems and full regulatory qualification protocols with air balancing, HEPA filter PAO integrity, and continuous room cascading audits.</p>',
                icon: 'Activity',
                heroImage: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1200&q=80',
                order: 7,
            },
        ];
        const divisionMap = {};
        for (const div of divisionsData) {
            const doc = await division_model_1.DivisionModel.findOneAndUpdate({ slug: div.slug }, div, {
                upsert: true,
                returnDocument: 'after',
            });
            divisionMap[div.slug] = doc._id;
        }
        console.log(`✅ [Divisions] Seeded 7 Turnkey Divisions`);
        // 3. Sample Products (Equipment & Components)
        const productsData = [
            {
                divisionId: divisionMap['cleanroom-panels'],
                category: 'Modular Walls',
                subcategory: 'PUF Panels',
                name: 'cGMP Modular PUF Wall Panel (50mm / 80mm)',
                slug: 'cgmp-modular-puf-wall-panel',
                description: '<p>Tongue and groove interlocking panels with food-grade PPGI skins and high-density CFC-free polyurethane foam core.</p>',
                specifications: [
                    { key: 'Thickness Options', value: '50mm, 80mm, 100mm' },
                    { key: 'Insulation Core', value: 'Polyurethane Foam (PUF) 40 ± 2 kg/m³' },
                    { key: 'Skin Material', value: '0.6mm Pre-Painted Galvanized Iron (PPGI)' },
                    { key: 'Fire Rating', value: 'Class B1 / B2 Flame Retardant' },
                ],
                images: ['https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=800&q=80'],
                tags: ['Cleanroom', 'Modular', 'PUF', 'cGMP'],
                isFeatured: true,
                order: 1,
            },
            {
                divisionId: divisionMap['cleanroom-panels'],
                category: 'Cleanroom Doors',
                subcategory: 'Flush Doors',
                name: 'Flush Metal Cleanroom Door with Interlocking System',
                slug: 'flush-metal-cleanroom-door',
                description: '<p>Full flush double-glazed view panel cleanroom doors with perimeter silicone seals and automated magnetic interlock.</p>',
                specifications: [
                    { key: 'Door Leaf', value: '46mm thick with honeycomb/PUF infill' },
                    { key: 'Frame', value: 'Extruded aluminum powder coated / SS 304' },
                    { key: 'View Panel', value: 'Double-glazed flush toughened glass' },
                    { key: 'Interlocking', value: 'Electro-magnetic 12V DC system' },
                ],
                images: ['https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80'],
                tags: ['Doors', 'Airlock', 'Interlock', 'Schedule M'],
                isFeatured: true,
                order: 2,
            },
            {
                divisionId: divisionMap['hvac-ahu-systems'],
                category: 'Air Handling Units',
                subcategory: 'Double Skin AHU',
                name: 'Double Skin Modular AHU (5,000 – 40,000 CFM)',
                slug: 'double-skin-modular-ahu',
                description: '<p>Extruded thermal-break aluminum profile casing with multi-stage filtration and electronically commutated plug fans.</p>',
                specifications: [
                    { key: 'Capacity Range', value: '2,000 CFM to 40,000 CFM' },
                    { key: 'Panel Infill', value: '43 ± 2 kg/m³ PUF Insulation' },
                    { key: 'Fan Type', value: 'High efficiency backward curved plug fan' },
                    { key: 'Coil Construction', value: 'Copper tubes with hydrophilic aluminum fins' },
                ],
                images: ['https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80'],
                tags: ['HVAC', 'AHU', 'Thermal Break', 'Air Balancing'],
                isFeatured: true,
                order: 3,
            },
        ];
        for (const prod of productsData) {
            await product_model_1.ProductModel.findOneAndUpdate({ slug: prod.slug }, prod, { upsert: true });
        }
        console.log(`✅ [Products] Seeded core equipment catalog`);
        // 4. Filtration Catalog Items
        const filtersData = [
            {
                category: 'pre-filter',
                name: 'Synthetic Pleated Primary Air Pre-Filter (G4 / MERV 8)',
                micronRating: '10 Micron (90% arrestance)',
                mediaConstruction: 'Non-woven synthetic polyester fibers laminated to expanded wire mesh',
                frame: 'Extruded Anodized Aluminum / GI Sheet',
                applications: ['AHU fresh air intakes', 'Cleanroom primary stage air filtering'],
                keyFeature: 'Washable media with low initial pressure drop',
                images: ['https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80'],
                order: 1,
            },
            {
                category: 'fine-filter',
                name: 'Microvee Synthetic Secondary Fine Filter (F9 / MERV 15)',
                micronRating: '3 to 5 Micron (95% efficiency)',
                mediaConstruction: 'Progressively structured micro-fine synthetic media',
                frame: 'Aluminum Alloy / SS 304',
                applications: ['Pharmaceutical process supply air', 'Secondary AHU filter bank'],
                keyFeature: 'High dust holding capacity with zero media migration',
                images: ['https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80'],
                order: 2,
            },
            {
                category: 'gel-seal-hepa',
                name: 'Fluid Gel-Seal Terminal HEPA Filter (H14 / 99.997%)',
                micronRating: '0.3 Micron (99.997% DOP/PAO)',
                mediaConstruction: 'Ultra-fine borosilicate micro-fiber glass paper with hot-melt separators',
                frame: 'Extruded Anodized Aluminum with polyurethane gel channel',
                applications: ['Sterile filling suites', 'Laminar Airflow Benches', 'ISO Class 5 zones'],
                keyFeature: 'Knife-edge fluid seal guaranteeing zero perimeter air leakage',
                images: ['https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80'],
                order: 3,
            },
            {
                category: 'standard-hepa',
                name: 'Standard Gasket-Seal Deep Pleat HEPA Filter (H13)',
                micronRating: '0.3 Micron (99.97% efficiency)',
                mediaConstruction: 'Water resistant glass microfiber paper with corrugated aluminum separators',
                frame: 'SS 304 / Aluminum',
                applications: ['Cleanroom ceiling diffusers', 'AHU final stage filter bank'],
                keyFeature: 'Continuous neoprene gasket seal with individual test certification',
                images: ['https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80'],
                order: 4,
            },
        ];
        for (const f of filtersData) {
            await filter_model_1.FilterModel.findOneAndUpdate({ name: f.name }, f, { upsert: true });
        }
        console.log(`✅ [Filters] Seeded filtration catalog`);
        // 5. Sample Client References & Portfolio Case Studies
        const projectsData = [
            {
                clientName: 'Zeon Healthcare Ltd',
                scope: 'Turnkey 15,000 sq.ft. Nutraceutical Cleanroom & AHU Validation',
                location: 'Paonta Sahib, Himachal Pradesh',
                division: ['Cleanroom Infrastructure & Modular Panels', 'HVAC Systems, AHUs & Dehumidifiers'],
                completionYear: 2024,
                description: '<p>Complete modular cleanroom installation including 80mm PUF panels, dedicated AHUs with gel-seal HEPA terminal housings, and full DQ/IQ/OQ validation protocols.</p>',
                images: ['https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=800&q=80'],
                isFeatured: true,
                order: 1,
            },
            {
                clientName: 'Windlas Biotech Limited',
                scope: 'ISO Class 7 OSD Formulation Block HVAC & Cleanroom Overhaul',
                location: 'Dehradun, Uttarakhand',
                division: ['HVAC Systems, AHUs & Dehumidifiers', 'Air Filtration & Terminal Housings'],
                completionYear: 2023,
                description: '<p>Retrofitting of centralized chilled water coils, high-efficiency F9/H14 filtration banks, and automated BMS differential pressure cascading.</p>',
                images: ['https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80'],
                isFeatured: true,
                order: 2,
            },
            {
                clientName: 'Wallace Pharmaceuticals',
                scope: 'Sterile Injectable Vial Filling Line Cleanroom Class B/A',
                location: 'Baddi, Himachal Pradesh',
                division: ['Cleanroom Infrastructure & Modular Panels', 'BMS, EMS & Validation Services'],
                completionYear: 2024,
                description: '<p>Airlocks, Dynamic Pass Boxes, Laminar Airflow workstations, and comprehensive PAO in-situ HEPA integrity validation.</p>',
                images: ['https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80'],
                isFeatured: true,
                order: 3,
            },
        ];
        for (const p of projectsData) {
            await project_model_1.ProjectModel.findOneAndUpdate({ clientName: p.clientName }, p, { upsert: true });
        }
        console.log(`✅ [Projects] Seeded portfolio case studies`);
        // 6. Client Logo Wall
        const clientsData = [
            { name: 'Zeon Healthcare', logoUrl: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=200&q=80', sector: 'Healthcare', order: 1 },
            { name: 'Windlas Biotech', logoUrl: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=200&q=80', sector: 'Pharmaceutical', order: 2 },
            { name: 'Wallace Pharmaceuticals', logoUrl: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=200&q=80', sector: 'Pharmaceutical', order: 3 },
            { name: 'BioMarq / Mankind Group', logoUrl: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=200&q=80', sector: 'Biotechnology', order: 4 },
        ];
        for (const c of clientsData) {
            await client_model_1.ClientModel.findOneAndUpdate({ name: c.name }, c, { upsert: true });
        }
        console.log(`✅ [Clients] Seeded trust logo wall`);
        // 7. Site Settings Dictionary
        const settingsData = [
            { key: 'hero_headline', value: 'All Solutions in One Project: Turnkey Cleanroom, HVAC, Piping & Industrial Utilities', description: 'Primary hero statement' },
            { key: 'metric_years_exp', value: '15+', description: 'Years of engineering leadership' },
            { key: 'metric_projects_count', value: '100+', description: 'Turnkey cleanroom projects executed' },
            { key: 'metric_compliance_rate', value: '100%', description: 'cGMP / ISO 14644 compliance pass rate' },
            { key: 'whatsapp_number', value: '+919817343117', description: 'Primary WhatsApp hotline' },
            { key: 'primary_phone', value: '+91-9817343117', description: 'Head office telephone' },
            { key: 'primary_email', value: 'gmpvision3@gmail.com', description: 'Central inquiry email' },
            { key: 'brochure_pdf', value: '/Broucher.pdf', description: 'Corporate brochure download URL' },
        ];
        for (const s of settingsData) {
            await setting_model_1.SettingModel.findOneAndUpdate({ key: s.key }, s, { upsert: true });
        }
        console.log(`✅ [Settings] Seeded site configuration dictionary`);
        console.log('🎉 [Seeder] Database seeding completed successfully with 0 errors!');
    }
    finally {
        await (0, db_1.disconnectDB)();
    }
}
seed().catch((err) => {
    console.error('💥 [Seeder Error] Failed to seed database:', err);
    process.exit(1);
});
