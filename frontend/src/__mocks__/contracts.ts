// Mock contract functions for testing
export const mockContract = {
  methods: {
    buyTickets: jest.fn().mockImplementation((amount: string) => ({
      send: jest.fn().mockResolvedValue({
        events: {
          TicketsPurchased: {
            returnValues: {
              buyer: '0x1234567890123456789012345678901234567890',
              amount: amount,
            },
          },
        },
      }),
    })),
    getTicketPrice: jest.fn().mockResolvedValue('100000000000000000'), // 0.1 ETH
    getTicketCount: jest.fn().mockResolvedValue('10'),
    getMaxTicketsPerUser: jest.fn().mockResolvedValue('100'),
  },
};

export const getContract = jest.fn().mockResolvedValue(mockContract);
