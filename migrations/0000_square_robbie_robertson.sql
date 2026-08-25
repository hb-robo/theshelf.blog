CREATE TABLE `events` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`media_id` text NOT NULL,
	`date` text NOT NULL,
	`source` text DEFAULT 'site' NOT NULL,
	`source_url` text,
	`score` real,
	`status` text,
	`published` integer DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE `media_items` (
	`id` text PRIMARY KEY NOT NULL,
	`review_id` text,
	`status` text,
	`score` real,
	FOREIGN KEY (`review_id`) REFERENCES `reviews`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `reviews` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`date` text NOT NULL,
	`published` integer DEFAULT false NOT NULL,
	`hero_image` text,
	`excerpt` text
);
