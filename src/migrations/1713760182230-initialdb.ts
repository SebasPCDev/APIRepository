import { MigrationInterface, QueryRunner } from "typeorm";

export class Initialdb1713760182230 implements MigrationInterface {
    name = 'Initialdb1713760182230'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878" UNIQUE ("name"), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "description" character varying(255) NOT NULL, "price" numeric(10,2) NOT NULL, "stock" integer NOT NULL, "image" character varying NOT NULL, "category_id" uuid, CONSTRAINT "UQ_4c9fb58de893725258746385e16" UNIQUE ("name"), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orderdetails" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "price" numeric(10,2) NOT NULL, "id_order" uuid, CONSTRAINT "REL_ae08f04484b7c9b69d3bd2bba0" UNIQUE ("id_order"), CONSTRAINT "PK_cf4437dc89cc45584aba8c340cd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" TIMESTAMP NOT NULL, "user_id" uuid, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "email" character varying(50) NOT NULL, "password" character varying NOT NULL, "phone" integer NOT NULL, "address" character varying NOT NULL, "country" character varying NOT NULL, "city" character varying(50) NOT NULL, "admin" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products_details_orderdetails" ("productsId" uuid NOT NULL, "orderdetailsId" uuid NOT NULL, CONSTRAINT "PK_90c3567419152cfdfd6f799e7e2" PRIMARY KEY ("productsId", "orderdetailsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e01042ac01077bc87cf6e66725" ON "products_details_orderdetails" ("productsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_ccc55175571e76e093332ece2a" ON "products_details_orderdetails" ("orderdetailsId") `);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_9a5f6868c96e0069e699f33e124" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orderdetails" ADD CONSTRAINT "FK_ae08f04484b7c9b69d3bd2bba0a" FOREIGN KEY ("id_order") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_a922b820eeef29ac1c6800e826a" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products_details_orderdetails" ADD CONSTRAINT "FK_e01042ac01077bc87cf6e66725d" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "products_details_orderdetails" ADD CONSTRAINT "FK_ccc55175571e76e093332ece2ab" FOREIGN KEY ("orderdetailsId") REFERENCES "orderdetails"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products_details_orderdetails" DROP CONSTRAINT "FK_ccc55175571e76e093332ece2ab"`);
        await queryRunner.query(`ALTER TABLE "products_details_orderdetails" DROP CONSTRAINT "FK_e01042ac01077bc87cf6e66725d"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_a922b820eeef29ac1c6800e826a"`);
        await queryRunner.query(`ALTER TABLE "orderdetails" DROP CONSTRAINT "FK_ae08f04484b7c9b69d3bd2bba0a"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_9a5f6868c96e0069e699f33e124"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ccc55175571e76e093332ece2a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e01042ac01077bc87cf6e66725"`);
        await queryRunner.query(`DROP TABLE "products_details_orderdetails"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TABLE "orderdetails"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "categories"`);
    }

}
