import { INestApplication, ModuleMetadata } from '@nestjs/common'
import { Test, TestingModule, TestingModuleBuilder } from '@nestjs/testing'
import { AppModule } from 'src/app.module'
import request from 'supertest'
import TestAgent from 'supertest/lib/agent'

export class TestApi {
  public app: INestApplication
  public static testingModule: TestingModule

  public static async init(): Promise<TestApi> {
    const testApi = new this()
    testApi.defaultModule()

    return testApi
  }

  public async defaultModule(): Promise<void> {
    const testingModule: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    this.app = await testingModule.createNestApplication().init()
  }

  public async configureModuleBuilder(
    callback: CreateDefaultTestingModule,
    moduleMetadata: ModuleMetadata = {
      imports: [AppModule],
    },
  ): Promise<void> {
    const testingModule: TestingModule = await callback(
      Test.createTestingModule(moduleMetadata),
    )

    this.app = await testingModule.createNestApplication().init()
  }

  public request(): TestAgent<any> {
    return request(this.app.getHttpServer())
  }

  public async close(): Promise<void> {
    await this.app.close()
  }
}

export type CreateDefaultTestingModule = (
  testingModuleBuilder: TestingModuleBuilder,
) => Promise<TestingModule>
