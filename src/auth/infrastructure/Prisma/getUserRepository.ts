import { PrismaClient } from '@prisma/client';

const getUserRepository = async (email: string, password: string) => {
	const prisma = new PrismaClient();
	return prisma.user.findFirst({
		where: {
			AND: [
				{
					email: {
						equals: email,
					},
				},
				{
					password: {
						equals: password,
					},
				},
			],
		},
	});
};

export default getUserRepository;
