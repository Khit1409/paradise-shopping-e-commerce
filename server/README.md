# server source structor
src/
├── app.module.ts
├── config/
│   ├── database/
│   │   ├── mongoose.config.ts
│   │   ├── typeorm.config.ts
│   └── env.config.ts
│
├── common/
│   ├── constants/
│   ├── decorators/
│   ├── exceptions/
│   ├── filters/
│   ├── interceptors/
│   ├── pipes/
│   ├── utils/
│   └── types/
│
├── domain/
│   ├── entities/
│   │   ├── product.entity.ts
│   │   ├── user.entity.ts
│   │   └── order.entity.ts
│   ├── repositories/
│   │   ├── product.repository.interface.ts
│   │   ├── user.repository.interface.ts
│   │   └── order.repository.interface.ts
│   └── value-objects/
│
├── infrastructure/
│   ├── database/
│   │   ├── mongoose/
│   │   │   ├── schemas/
│   │   │   │   └── product.schema.ts
│   │   │   ├── repositories/
│   │   │   │   └── product.mongo.repository.ts
│   │   │   └── index.ts
│   │   ├── typeorm/
│   │   │   ├── entities/
│   │   │   │   └── product.sql.entity.ts
│   │   │   ├── repositories/
│   │   │   │   └── product.sql.repository.ts
│   │   │   └── index.ts
│   │
│   ├── adapters/
│   │   ├── email/
│   │   ├── storage/
│   │   └── payment/
│   │
│   └── mappers/
│       ├── product.mapper.ts
│       └── user.mapper.ts
│
├── modules/
│   ├── product/
│   │   ├── product.module.ts
│   │   ├── product.controller.ts
│   │   ├── product.service.ts
│   │   ├── dto/
│   │   │   ├── create-product.dto.ts
│   │   │   └── update-product.dto.ts
│   │   └── index.ts
│   │
│   ├── user/
│   │   ├── user.module.ts
│   │   ├── user.controller.ts
│   │   ├── user.service.ts
│   │   └── dto/
│   │       ├── create-user.dto.ts
│   │       └── update-user.dto.ts
│   │
│   └── order/
│       ├── order.module.ts
│       ├── order.controller.ts
│       ├── order.service.ts
│       └── dto/
│           ├── create-order.dto.ts
│           └── update-order.dto.ts
│
└── main.ts
