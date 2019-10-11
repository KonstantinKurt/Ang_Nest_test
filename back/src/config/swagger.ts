import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {INestApplication} from '@nestjs/common';

export function getSwaggerDocs(app: INestApplication): void {
    const swaggerOptions = new DocumentBuilder()
        .setTitle('Ang_Nest_test')
        .setBasePath('/')
        .setVersion('Dev')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, swaggerOptions, {
        include: [

        ],
    });
    SwaggerModule.setup('docs', app, document);
}
