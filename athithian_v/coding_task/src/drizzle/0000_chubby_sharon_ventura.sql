CREATE TABLE IF NOT EXISTS `change` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`doc_id` int NOT NULL,
	`version_id` int,
	`timestamp` timestamp DEFAULT (now()),
	`details` varchar(255),
	CONSTRAINT `change_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `document` (
	`id` int AUTO_INCREMENT NOT NULL,
	`owner_id` int NOT NULL,
	`name` varchar(255) NOT NULL,
	`url` varchar(255) NOT NULL,
	`path` varchar(255) NOT NULL,
	`file_type` varchar(50),
	`size` bigint,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`description` varchar(255),
	`status` enum('active','archived') DEFAULT 'active',
	CONSTRAINT `document_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `permission` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`doc_id` int NOT NULL,
	`permission` enum('view','edit') DEFAULT 'view',
	CONSTRAINT `permission_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `user` (
	`id` int AUTO_INCREMENT NOT NULL,
	`username` varchar(255),
	`email` varchar(255),
	`password` varchar(255),
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `user_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_username_unique` UNIQUE(`username`),
	CONSTRAINT `user_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `Version` (
	`id` int AUTO_INCREMENT NOT NULL,
	`doc_id` int NOT NULL,
	`version` int NOT NULL DEFAULT 1,
	`url` varchar(255) NOT NULL,
	`path` varchar(255) NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	`description` varchar(255),
	CONSTRAINT `Version_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `change` ADD CONSTRAINT `change_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `change` ADD CONSTRAINT `change_doc_id_document_id_fk` FOREIGN KEY (`doc_id`) REFERENCES `document`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `change` ADD CONSTRAINT `change_version_id_Version_id_fk` FOREIGN KEY (`version_id`) REFERENCES `Version`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `document` ADD CONSTRAINT `document_owner_id_user_id_fk` FOREIGN KEY (`owner_id`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `permission` ADD CONSTRAINT `permission_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `permission` ADD CONSTRAINT `permission_doc_id_document_id_fk` FOREIGN KEY (`doc_id`) REFERENCES `document`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Version` ADD CONSTRAINT `Version_doc_id_document_id_fk` FOREIGN KEY (`doc_id`) REFERENCES `document`(`id`) ON DELETE no action ON UPDATE no action;