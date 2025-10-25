-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "Lifestyle" AS ENUM ('SEDENTARY', 'MINIMAL', 'OFFICE_WORK', 'ACTIVE', 'VERY_ACTIVE');

-- CreateEnum
CREATE TYPE "ExerciseLevel" AS ENUM ('BEGINNER', 'INTERMEDIATE_1_3', 'INTERMEDIATE_3_5', 'ADVANCED', 'EXPERT');

-- CreateEnum
CREATE TYPE "ExerciseFrequency" AS ENUM ('NONE', 'ONCE_WEEKLY', 'TWICE_WEEKLY', 'THRICE_WEEKLY', 'FOUR_WEEKLY', 'FIVE_WEEKLY', 'SIX_WEEKLY', 'DAILY');

-- CreateEnum
CREATE TYPE "HealthLevel" AS ENUM ('VERY_GOOD', 'GOOD', 'ABOVE_AVERAGE', 'AVERAGE', 'BELOW_AVERAGE', 'POOR', 'VERY_POOR');

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "macro_profiles" (
    "id" UUID NOT NULL,
    "gender" "Gender" NOT NULL,
    "age" INTEGER NOT NULL,
    "height" DOUBLE PRECISION NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "lifestyle" "Lifestyle" NOT NULL,
    "exerciseLevel" "ExerciseLevel" NOT NULL,
    "exerciseFrequency" "ExerciseFrequency" NOT NULL,
    "healthLevel" "HealthLevel" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "macro_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "macro_profiles" ADD CONSTRAINT "macro_profiles_id_fkey" FOREIGN KEY ("id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Grant basic permissions to roles
GRANT USAGE ON SCHEMA public TO authenticated, anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public."users" TO authenticated, anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public."macro_profiles" TO authenticated, anon;

-- Enable Row Level Security
ALTER TABLE public."users" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."macro_profiles" ENABLE ROW LEVEL SECURITY;

-- Users table policies
CREATE POLICY "Users can insert their own profile"
  ON public."users"
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL AND auth.uid() = id);

CREATE POLICY "Users can view their own profile"
  ON public."users"
  FOR SELECT
  TO authenticated
  USING (auth.uid() IS NOT NULL AND auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public."users"
  FOR UPDATE
  TO authenticated
  USING (auth.uid() IS NOT NULL AND auth.uid() = id)
  WITH CHECK (auth.uid() IS NOT NULL AND auth.uid() = id);

CREATE POLICY "Users can delete their own profile"
  ON public."users"
  FOR DELETE
  TO authenticated
  USING (auth.uid() IS NOT NULL AND auth.uid() = id);

-- Macro profiles table policies
CREATE POLICY "Users can insert their own macro profile"
  ON public."macro_profiles"
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL AND auth.uid() = id);

CREATE POLICY "Users can view their own macro profile"
  ON public."macro_profiles"
  FOR SELECT
  TO authenticated
  USING (auth.uid() IS NOT NULL AND auth.uid() = id);

CREATE POLICY "Users can update their own macro profile"
  ON public."macro_profiles"
  FOR UPDATE
  TO authenticated
  USING (auth.uid() IS NOT NULL AND auth.uid() = id)
  WITH CHECK (auth.uid() IS NOT NULL AND auth.uid() = id);

CREATE POLICY "Users can delete their own macro profile"
  ON public."macro_profiles"
  FOR DELETE
  TO authenticated
  USING (auth.uid() IS NOT NULL AND auth.uid() = id);
