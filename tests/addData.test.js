import test from "node:test";
import assert from "node:assert";
import { server } from "../apidefs.js";
import { getUserById } from "../databases/db.js";

//Add new data. Then checks response body and database using getUserById method
test("addData creates new user with next free id", async () => {
  await server.start();
  const mutation = `
        mutation ($forename: String!, $surname: String!) {
            addData(forename: $forename, surname: $surname) {
                id
                forename
                surname
            }
        }
    `;

  const response = await server.executeOperation(
    {
      query: mutation,
      variables: { forename: "Frank", surname: "Lampard" },
    },
    { contextValue: { user: { username: "jk" } } }
  );

  await server.stop();

  const expectedUser = getUserById(4);

  assert.ok(response.body.singleResult.data);
  assert.equal(response.body.singleResult.data.addData.id, "4");
  assert.equal(response.body.singleResult.data.addData.forename, "Frank");
  assert.equal(response.body.singleResult.data.addData.surname, "Lampard");
  assert.ok(expectedUser);
  assert.equal(expectedUser.forename, "Frank");
});
