import { MikroORM } from '@mikro-orm/core';
import { __prod__ } from './constants';
import { Post } from './entities/Post';
import microConfig from './mikro-orm.config';

const main = async () => {
	// connect to db
	const orm = await MikroORM.init(microConfig);

	// run migrations
	await orm.getMigrator().up();

	// run SQL
	// const post = orm.em.create(Post, { title: 'first test post!' });
	// await orm.em.persistAndFlush(post);

	// get all posts
	const posts = await orm.em.find(Post, {});
	console.log(posts);
};

main().catch((err) => {
	console.error(err);
});
