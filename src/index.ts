import { MikroORM } from '@mikro-orm/core';
import { __prod__ } from './constants';
import { Post } from './entities/Post';
import microConfig from './mikro-orm.config';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { HelloResolver } from './resolvers/hello';

const main = async () => {
	// connect to db
	const orm = await MikroORM.init(microConfig);
	// run migrations
	await orm.getMigrator().up();

	// create express server
	const app = express();

	// create graphql endpoint (on our express server)
	const apolloServer = new ApolloServer({
		schema: await buildSchema({
			resolvers: [HelloResolver],
			validate: false
		})
	});

	apolloServer.applyMiddleware({ app });

	// dedicate a port for server to run on
	app.listen(4000, () => {
		console.log('server started on localhost:4000');
	});
};

main().catch((err) => {
	console.error(err);
});
