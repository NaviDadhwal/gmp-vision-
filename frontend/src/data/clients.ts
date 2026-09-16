export interface IClientItem {
  id: string;
  name: string;
  sector: 'Pharmaceutical' | 'Biotechnology' | 'Healthcare' | 'Industrial';
  location: string;
  isFeatured: boolean;
  order: number;
}

export const CLIENTS_DATA: IClientItem[] = [
  { id: 'cli-1', name: 'Zeon Healthcare / Lifesciences Ltd', sector: 'Pharmaceutical', location: 'Paonta Sahib, HP', isFeatured: true, order: 1 },
  { id: 'cli-2', name: 'Windlas Biotech Ltd', sector: 'Pharmaceutical', location: 'Dehradun, UK', isFeatured: true, order: 2 },
  { id: 'cli-3', name: 'BioMarq Labs (Mankind Group)', sector: 'Biotechnology', location: 'Dehradun, UK', isFeatured: true, order: 3 },
  { id: 'cli-4', name: 'Hindustan Antibiotics Ltd', sector: 'Pharmaceutical', location: 'Pune, MH', isFeatured: true, order: 4 },
  { id: 'cli-5', name: 'Infuze Well Pvt Ltd', sector: 'Pharmaceutical', location: 'Mohali, PB', isFeatured: true, order: 5 },
  { id: 'cli-6', name: 'Penam Lifesciences Ltd', sector: 'Pharmaceutical', location: 'Kala Amb, HP', isFeatured: true, order: 6 },
  { id: 'cli-7', name: 'Wallace Pharma', sector: 'Pharmaceutical', location: 'Kala Amb / Jammu', isFeatured: true, order: 7 },
  { id: 'cli-8', name: 'Verve Human Care', sector: 'Healthcare', location: 'Dehradun, UK', isFeatured: true, order: 8 },
  { id: 'cli-9', name: 'Skins Pharma', sector: 'Pharmaceutical', location: 'Baddi, HP', isFeatured: true, order: 9 },
  { id: 'cli-10', name: 'SKS Metals', sector: 'Industrial', location: 'Kala Amb, HP', isFeatured: true, order: 10 },
  { id: 'cli-11', name: 'Osppa Enterprise', sector: 'Industrial', location: 'Ahmedabad, GJ', isFeatured: true, order: 11 },
  { id: 'cli-12', name: 'Apy Pharma', sector: 'Pharmaceutical', location: 'Guwahati, AS', isFeatured: true, order: 12 }
];

export const clients = CLIENTS_DATA;
