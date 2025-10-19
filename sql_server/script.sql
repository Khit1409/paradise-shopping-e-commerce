use paradise_shopping
create table
    Users (
        id bigint primary key identity (1, 1),
        firtName nvarchar (100),
        lastName nvarchar (100),
        emailAddress nvarchar (200),
        passwordHashed nvarchar (50),
        avatarUrl nvarchar (max),
        createdAt datetime2 not null default getDate (),
        updatedAt datetime2 default getDate ()
    )
create table
    Sellers (
        id bigint primary key identity (1, 1),
        firtName nvarchar (100),
        lastName nvarchar (100),
        emailAddress nvarchar (200),
        passwordHashed nvarchar (50),
        avatarUrl nvarchar (max),
        createdAt datetime2 not null default getDate (),
        updatedAt datetime2 default getDate ()
    )
create table
    Stores (
        id bigint primary key identity (1, 1),
        ownerId bigint not null,
        storeName nvarchar (200) not null,
        storeArea nvarchar (200) not null,
        storeAddress nvarchar (max),
        createdAt datetime2 not null default getDate (),
        updatedAt datetime2 default getDate ()
    )
alter table Stores add constraint FK_Stores_Sellers foreign key (ownerId) references Sellers (id) on delete cascade on update cascade
create table
    StoreBankingInfo (
        id bigint primary key identity (1, 1),
        storeId bigint not null,
        bankName nvarchar (200) not null,
        bankNum nvarchar (200)
    )
alter table StoreBankingInfo add constraint FK_StoreBankingInfo_Stores foreign key (storeId) references Stores (id) on delete cascade on update cascade