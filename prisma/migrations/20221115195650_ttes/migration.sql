-- DropForeignKey
ALTER TABLE "Users" DROP CONSTRAINT "Users_account_id_fkey";

-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "account_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "Accounts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
