export interface Client {
  id: string;
  name: string;
  industry: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

export const mockClients: Client[] = [
  {
    id: '1',
    name: 'Acme Corporation',
    industry: 'Retail',
    status: 'active',
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    name: 'Brew Coffee Co.',
    industry: 'F&B',
    status: 'active',
    createdAt: '2024-02-20'
  },
  {
    id: '3',
    name: 'FitLife Gym',
    industry: 'Fitness',
    status: 'active',
    createdAt: '2024-03-10'
  },
  {
    id: '4',
    name: 'TechStart Inc.',
    industry: 'Technology',
    status: 'active',
    createdAt: '2024-01-25'
  },
  {
    id: '5',
    name: 'Fashion Forward',
    industry: 'Retail',
    status: 'active',
    createdAt: '2024-02-15'
  }
];
