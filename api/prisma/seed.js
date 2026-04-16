import 'dotenv/config';
import pkg from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const { PrismaClient, WorkspaceRole } = pkg;

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  const ada = await prisma.user.upsert({
    where: { email: "ada@nexusforge.dev" },
    update: {
      name: "Ada LoveLace",
      avatarInitials: "AL",
    },
    create: {
      email: "ada@nexusforge.dev",
      name: "Ada LoveLace",
      avatarInitials: "AL",
    },
  });

  const linus = await prisma.user.upsert({
    where: { email: "linus@nexusforge.dev" },
    update: {
      name: "Linus Torvalds",
      avatarInitials: "LT",
    },
    create: {
      email: "linus@nexusforge.dev",
      name: "Linus Torvalds",
      avatarInitials: "LT",
    },
  });

  const grace = await prisma.user.upsert({
    where: { email: "grace@nexusforge.dev" },
    update: {
      name: "Grace Hopper",
      avatarInitials: "GH",
    },
    create: {
      email: "grace@nexusforge.dev",
      name: "Grace Hopper",
      avatarInitials: "GH",
    },
  });

  const workspace = await prisma.workspace.upsert({
    where: { slug: "nexusforge-labs" },
    update: {
      name: "NexusForge Labs",
      description: "Flagship workspace for our AI-powered product engineering app.",
      ownerId: ada.id,
    },
    create: {
      name: "NexusForge Labs",
      slug: "nexusforge-labs",
      description: "Flagship workspace for our AI-powered product engineering app.",
      ownerId: ada.id,
    },
  });

  await prisma.workspaceMember.upsert({
    where: {
      workspaceId_userId: {
        workspaceId: workspace.id,
        userId: ada.id,
      },
    },
    update: { role: WorkspaceRole.OWNER },
    create: {
      workspaceId: workspace.id,
      userId: ada.id,
      role: WorkspaceRole.OWNER,
    },
  });

  await prisma.workspaceMember.upsert({
    where: {
      workspaceId_userId: {
        workspaceId: workspace.id,
        userId: linus.id,
      },
    },
    update: { role: WorkspaceRole.ADMIN },
    create: {
      workspaceId: workspace.id,
      userId: linus.id,
      role: WorkspaceRole.ADMIN,
    },
  });

  await prisma.workspaceMember.upsert({
    where: {
      workspaceId_userId: {
        workspaceId: workspace.id,
        userId: grace.id,
      },
    },
    update: { role: WorkspaceRole.MEMBER },
    create: {
      workspaceId: workspace.id,
      userId: grace.id,
      role: WorkspaceRole.MEMBER,
    },
  });

  console.log("Seed complete.");
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });