import { GraphQLServer } from 'graphql-yoga'
import typeDefs from './schema.graphql'
import pokemonTypes from './models/pokemonTypes'
import Query from './resolvers/Query'
import Mutation from './resolvers/Mutation'
import Subscription from './resolvers/Subscription'
// REsolvers do have (parent, args, context, info)
const resolvers = {
  Query: {
    getPokemon(parent, args, context, info) {
      console.log(info)
      return { name: 'pikachu', pokemonType: [pokemonTypes.ELECTRIC] }
    },
    getIndicator(parent, args, context, info) {
      const id = args.id;
      const database = context.database;
      const indicator = database.getIndicatorById(id);
      return indicator
    }
  },
  Indicator: {
    data(parent, args, context, info) {
      const indicatorId = parent.id;
      const database = context.database;
      const data = database.getDataByIndicatorId(indicatorId);
      return data;
    }
  },
  Data: {
    indicator(parent, args, { database }, info) {
      const indicatorId = parent.indicator;
      return database.getIndicatorById(indicatorId);
    }
  }

}

const server = new GraphQLServer({
  typeDefs: './schema.graphql',
  resolvers,
  context: {
    database: {
      getIndicatorById(id) {
        return {
          id: id,
          name: "Matricula"
        }
      },
      getDataByIndicatorId(id) {
        return [
          {
            id: 1,
            name: "data1",
            indicator: id
          },
          {
            id: 2,
            name: "data2",
            indicator: id
          }
        ]
      }
    }
  }
})

server.start(() => {
  console.log('Running!')
})
