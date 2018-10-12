import { GraphQLServer } from 'graphql-yoga';
import typeDefs from './typeDefs/gql.graphql';
import pokemonTypes from './models/pokemonTypes';
import Pokemon from './models/pokemon';

// REsolvers do have (parent, args, context, info)
const resolvers = {
  Query: {
    getPokemon (parent, args, context, info) {
      return {name:'pikachu', pokemonType: [pokemonTypes.ELECTRIC]};
    }
  }
}

const server = new GraphQLServer({
  typeDefs: [typeDefs],
  resolvers
})

server.start(() => {
  console.log('Running!')
})
