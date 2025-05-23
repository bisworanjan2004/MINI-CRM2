// Mock data for leads
export const mockLeads = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+1 (555) 123-4567",
    company: "Acme Inc",
    position: "CTO",
    status: "new",
    assignedTo: "Jane Smith",
    createdAt: "2023-05-15",
    address: "123 Main St, New York, NY 10001",
    notes: "Met at the tech conference last month.",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.j@techcorp.com",
    phone: "+1 (555) 987-6543",
    company: "TechCorp",
    position: "CEO",
    status: "contacted",
    assignedTo: "Mike Johnson",
    createdAt: "2023-05-18",
    address: "456 Park Ave, San Francisco, CA 94107",
    notes: "Interested in our enterprise solution.",
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "michael.b@globex.net",
    phone: "+1 (555) 456-7890",
    company: "Globex",
    position: "IT Director",
    status: "qualified",
    assignedTo: "John Doe",
    createdAt: "2023-05-20",
    address: "789 Broadway, Chicago, IL 60601",
    notes: "Looking to upgrade their current system.",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.d@startupco.io",
    phone: "+1 (555) 234-5678",
    company: "StartupCo",
    position: "Founder",
    status: "proposal",
    assignedTo: "Jane Smith",
    createdAt: "2023-05-22",
    address: "101 Startup Blvd, Austin, TX 78701",
    notes: "Needs a solution for their growing team.",
  },
  {
    id: "5",
    name: "David Wilson",
    email: "david.w@megacorp.org",
    phone: "+1 (555) 876-5432",
    company: "MegaCorp",
    position: "COO",
    status: "negotiation",
    assignedTo: "Mike Johnson",
    createdAt: "2023-05-25",
    address: "202 Corporate Dr, Seattle, WA 98101",
    notes: "Discussing pricing options.",
  },
  {
    id: "6",
    name: "Jennifer Lee",
    email: "jennifer.l@innovate.co",
    phone: "+1 (555) 345-6789",
    company: "Innovate Co",
    position: "CIO",
    status: "won",
    assignedTo: "John Doe",
    createdAt: "2023-05-28",
    address: "303 Innovation Way, Boston, MA 02110",
    notes: "Signed contract, implementation starting next month.",
  },
  {
    id: "7",
    name: "Robert Taylor",
    email: "robert.t@oldschool.com",
    phone: "+1 (555) 654-3210",
    company: "Old School Industries",
    position: "President",
    status: "lost",
    assignedTo: "Jane Smith",
    createdAt: "2023-05-30",
    address: "404 Vintage Rd, Miami, FL 33101",
    notes: "Decided to go with a competitor.",
  },
  {
    id: "8",
    name: "Lisa Anderson",
    email: "lisa.a@futurecorp.net",
    phone: "+1 (555) 789-0123",
    company: "Future Corp",
    position: "VP of Operations",
    status: "new",
    assignedTo: "Mike Johnson",
    createdAt: "2023-06-02",
    address: "505 Tomorrow Ave, Denver, CO 80201",
    notes: "Referred by Jennifer Lee.",
  },
  {
    id: "9",
    name: "Thomas Martin",
    email: "thomas.m@greentech.org",
    phone: "+1 (555) 321-0987",
    company: "GreenTech",
    position: "Sustainability Director",
    status: "contacted",
    assignedTo: "John Doe",
    createdAt: "2023-06-05",
    address: "606 Eco St, Portland, OR 97201",
    notes: "Interested in our eco-friendly options.",
  },
  {
    id: "10",
    name: "Michelle Garcia",
    email: "michelle.g@healthplus.com",
    phone: "+1 (555) 210-9876",
    company: "Health Plus",
    position: "Medical Director",
    status: "qualified",
    assignedTo: "Jane Smith",
    createdAt: "2023-06-08",
    address: "707 Wellness Blvd, Los Angeles, CA 90001",
    notes: "Looking for solutions for multiple clinics.",
  },
]

// Mock data for quotations
export const mockQuotations = [
  {
    id: "1",
    quotationNumber: "QT-0001",
    client: "Acme Inc",
    date: "2023-06-10",
    amount: 5250.0,
    status: "sent",
    validUntil: "2023-07-10",
    leadId: "1",
  },
  {
    id: "2",
    quotationNumber: "QT-0002",
    client: "TechCorp",
    date: "2023-06-12",
    amount: 8750.0,
    status: "accepted",
    validUntil: "2023-07-12",
    leadId: "2",
  },
  {
    id: "3",
    quotationNumber: "QT-0003",
    client: "Globex",
    date: "2023-06-15",
    amount: 12500.0,
    status: "draft",
    validUntil: "2023-07-15",
    leadId: "3",
  },
  {
    id: "4",
    quotationNumber: "QT-0004",
    client: "StartupCo",
    date: "2023-06-18",
    amount: 3750.0,
    status: "rejected",
    validUntil: "2023-07-18",
    leadId: "4",
  },
  {
    id: "5",
    quotationNumber: "QT-0005",
    client: "MegaCorp",
    date: "2023-06-20",
    amount: 15000.0,
    status: "sent",
    validUntil: "2023-07-20",
    leadId: "5",
  },
  {
    id: "6",
    quotationNumber: "QT-0006",
    client: "Innovate Co",
    date: "2023-06-22",
    amount: 7500.0,
    status: "accepted",
    validUntil: "2023-07-22",
    leadId: "6",
  },
  {
    id: "7",
    quotationNumber: "QT-0007",
    client: "Old School Industries",
    date: "2023-06-25",
    amount: 6250.0,
    status: "expired",
    validUntil: "2023-07-25",
    leadId: "7",
  },
  {
    id: "8",
    quotationNumber: "QT-0008",
    client: "Future Corp",
    date: "2023-06-28",
    amount: 9500.0,
    status: "draft",
    validUntil: "2023-07-28",
    leadId: "8",
  },
  {
    id: "9",
    quotationNumber: "QT-0009",
    client: "GreenTech",
    date: "2023-06-30",
    amount: 11250.0,
    status: "sent",
    validUntil: "2023-07-30",
    leadId: "9",
  },
  {
    id: "10",
    quotationNumber: "QT-0010",
    client: "Health Plus",
    date: "2023-07-02",
    amount: 18750.0,
    status: "accepted",
    validUntil: "2023-08-02",
    leadId: "10",
  },
]
