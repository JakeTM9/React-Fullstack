import React from "react";
import ReactDOM from "react-dom";
import { render } from 'react-dom';
import "./index.css";
import TodoList from "./TodoList";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    gql
  } from "@apollo/client";



//APOLLO + GRAPHQL CONFIGURATION
const client = new ApolloClient({
    uri: 'https://48p1r2roz4.sse.codesandbox.io',
    cache: new InMemoryCache()
  });

client
  .query({
    query: gql`
      query GetRates {
        rates(currency: "USD") {
          currency
        }
      }
    `
  })
  .then(result => console.log(result));

const EXCHANGE_RATES = gql`
  query GetExchangeRates {
    rates(currency: "USD") {
      currency
      rate
    }
  }
`;

function ExchangeRates() {
    const { loading, error, data } = useQuery(EXCHANGE_RATES);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return data.rates.map(({ currency, rate }) => (
        <div key={currency}>
        <p>
            {currency}: {rate}
        </p>
        </div>
    ));
}

function GraphQLApp() {
    return (
        <div>
        <h2 >Exchange Rate Data </h2><p>(Queryied with GraphQL)</p>
        <ExchangeRates />
        </div>
    );
}

//RENDER TODO
var destination = document.querySelector("#container");
render(
    <div>
        <TodoList/>
    </div>
    ,
    destination
);
//RENDER GRAPHQL DATA
var destination = document.querySelector("#container2");
render(
    <ApolloProvider client={client}>
      <GraphQLApp />
    </ApolloProvider>,
    destination
);