-- CreateTable
CREATE TABLE "gender" (
    "gender_id" SERIAL NOT NULL,
    "gender_name" TEXT NOT NULL,

    CONSTRAINT "gender_pkey" PRIMARY KEY ("gender_id")
);

-- CreateTable
CREATE TABLE "language" (
    "language_id" SERIAL NOT NULL,
    "language_name" TEXT NOT NULL,
    "language_key" TEXT NOT NULL,

    CONSTRAINT "language_pkey" PRIMARY KEY ("language_id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "oauth_token_secret" TEXT,
    "oauth_token" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "userId" TEXT NOT NULL,
    "userName" TEXT,
    "password" TEXT NOT NULL,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "language_id" INTEGER NOT NULL,
    "gender_id" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "projects" (
    "projectId" SERIAL NOT NULL,
    "projectName" TEXT NOT NULL,
    "projectCostumer" TEXT NOT NULL,
    "projectDate" TEXT NOT NULL,
    "projectVision" TEXT NOT NULL,
    "projectStatus" TEXT NOT NULL,
    "projectCompanyId" INTEGER NOT NULL,
    "projectEmployeeId" TEXT NOT NULL,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("projectId")
);

-- CreateTable
CREATE TABLE "companies" (
    "companyId" SERIAL NOT NULL,
    "companyName" TEXT NOT NULL,
    "notion_id" TEXT,

    CONSTRAINT "companies_pkey" PRIMARY KEY ("companyId")
);

-- CreateTable
CREATE TABLE "modules" (
    "moduleId" SERIAL NOT NULL,
    "moduleName" TEXT NOT NULL,
    "moduleComplete" BOOLEAN NOT NULL DEFAULT false,
    "moduleProblem" TEXT,
    "moduleQuestion" TEXT,
    "moduleProjectId" INTEGER NOT NULL,
    "moduleEmployeeId" TEXT NOT NULL,

    CONSTRAINT "modules_pkey" PRIMARY KEY ("moduleId")
);

-- CreateTable
CREATE TABLE "tasks" (
    "taskId" SERIAL NOT NULL,
    "taskName" TEXT NOT NULL,
    "taskComplete" BOOLEAN NOT NULL DEFAULT false,
    "taskEmployeeId" TEXT NOT NULL,
    "taskModuleId" INTEGER NOT NULL,
    "taskPhase" TEXT,

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("taskId")
);

-- CreateTable
CREATE TABLE "project_notion" (
    "project_id" TEXT NOT NULL,
    "project_notion_id" TEXT NOT NULL,
    "project_dbid" INTEGER NOT NULL,

    CONSTRAINT "project_notion_pkey" PRIMARY KEY ("project_id")
);

-- CreateTable
CREATE TABLE "user_notion" (
    "user_notion_id" TEXT NOT NULL,
    "user_notion_key" TEXT NOT NULL,
    "user_employee_id" TEXT NOT NULL,

    CONSTRAINT "user_notion_pkey" PRIMARY KEY ("user_notion_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "gender_gender_name_key" ON "gender"("gender_name");

-- CreateIndex
CREATE UNIQUE INDEX "language_language_key_key" ON "language"("language_key");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "projects_projectName_key" ON "projects"("projectName");

-- CreateIndex
CREATE UNIQUE INDEX "companies_companyName_key" ON "companies"("companyName");

-- CreateIndex
CREATE UNIQUE INDEX "project_notion_project_dbid_key" ON "project_notion"("project_dbid");

-- CreateIndex
CREATE UNIQUE INDEX "user_notion_user_employee_id_key" ON "user_notion"("user_employee_id");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_language_id_fkey" FOREIGN KEY ("language_id") REFERENCES "language"("language_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_gender_id_fkey" FOREIGN KEY ("gender_id") REFERENCES "gender"("gender_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_projectCompanyId_fkey" FOREIGN KEY ("projectCompanyId") REFERENCES "companies"("companyId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_projectEmployeeId_fkey" FOREIGN KEY ("projectEmployeeId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "modules" ADD CONSTRAINT "modules_moduleProjectId_fkey" FOREIGN KEY ("moduleProjectId") REFERENCES "projects"("projectId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "modules" ADD CONSTRAINT "modules_moduleEmployeeId_fkey" FOREIGN KEY ("moduleEmployeeId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_taskEmployeeId_fkey" FOREIGN KEY ("taskEmployeeId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_taskModuleId_fkey" FOREIGN KEY ("taskModuleId") REFERENCES "modules"("moduleId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_notion" ADD CONSTRAINT "project_notion_project_dbid_fkey" FOREIGN KEY ("project_dbid") REFERENCES "projects"("projectId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_notion" ADD CONSTRAINT "user_notion_user_employee_id_fkey" FOREIGN KEY ("user_employee_id") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
