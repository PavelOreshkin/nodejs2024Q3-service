import * as YAML from 'yamljs';
import { join } from 'node:path';
import { SwaggerModule } from '@nestjs/swagger';

export const runSwaggerDoc = (app) => {
  const document = YAML.load(join(process.cwd(), '/doc/api.yaml'));
  SwaggerModule.setup('doc', app, document);
};
