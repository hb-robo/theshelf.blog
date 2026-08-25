PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_media_items` (
	`id` text PRIMARY KEY NOT NULL,
	`status` text,
	`score` real
);
--> statement-breakpoint
INSERT INTO `__new_media_items`("id", "status", "score") SELECT "id", "status", "score" FROM `media_items`;--> statement-breakpoint
DROP TABLE `media_items`;--> statement-breakpoint
ALTER TABLE `__new_media_items` RENAME TO `media_items`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_events` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`media_id` text,
	`date` text NOT NULL,
	`source` text DEFAULT 'site' NOT NULL,
	`source_url` text,
	`score` real,
	`status` text,
	`published` integer DEFAULT false NOT NULL,
	FOREIGN KEY (`media_id`) REFERENCES `media_items`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_events`("id", "media_id", "date", "source", "source_url", "score", "status", "published") SELECT "id", "media_id", "date", "source", "source_url", "score", "status", "published" FROM `events`;--> statement-breakpoint
DROP TABLE `events`;--> statement-breakpoint
ALTER TABLE `__new_events` RENAME TO `events`;--> statement-breakpoint
ALTER TABLE `reviews` ADD `media_id` text REFERENCES media_items(id);