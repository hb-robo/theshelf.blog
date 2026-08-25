ALTER TABLE `media_items` ADD `title` text NOT NULL;--> statement-breakpoint
ALTER TABLE `media_items` ADD `release_date` text;--> statement-breakpoint
ALTER TABLE `media_items` ADD `media_type` text NOT NULL;--> statement-breakpoint
ALTER TABLE `media_items` ADD `subtype` text;--> statement-breakpoint
ALTER TABLE `media_items` ADD `cover_image` text;--> statement-breakpoint
ALTER TABLE `media_items` ADD `spine_image` text;--> statement-breakpoint
ALTER TABLE `media_items` ADD `creatives` text;--> statement-breakpoint
ALTER TABLE `media_items` ADD `genre` text;--> statement-breakpoint
ALTER TABLE `media_items` DROP COLUMN `status`;--> statement-breakpoint
ALTER TABLE `media_items` DROP COLUMN `score`;