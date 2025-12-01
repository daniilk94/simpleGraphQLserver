import test from "node:test";
import assert from "node:assert";
import { server } from "../apidefs.js";

test.before(async () => {
  await server.start();
});
test.after(async () => {
  await server.stop();
});

//Returns data with provided id
test("getDataById return the correct data for a given ID", async () => {
  const query = `
        query ($id: ID!) {
            getDataById(id: $id) {
                id
                forename
                surname
            }
        }
    `;

  const response = await server.executeOperation(
    {
      query,
      variables: { id: "1" },
    },
    { contextValue: { user: { username: "jk" } } }
  );

  assert.ok(response.body.singleResult.data);
  assert.equal(response.body.singleResult.data.getDataById.id, "1");
  assert.equal(response.body.singleResult.data.getDataById.forename, "Roy");
  assert.equal(response.body.singleResult.data.getDataById.surname, "Fielding");
});

//Wrong id
test("getDataById returns error if user does not exist", async () => {
  const query = `
        query ($id: ID!) {
            getDataById(id: $id) {
                id
                forename
                surname
            }
        }
    `;

  const response = await server.executeOperation(
    {
      query,
      variables: { id: "777" },
    },
    { contextValue: { user: { username: "jk" } } }
  );

  assert.equal(response.body.singleResult.data.getDataById, null);
  assert.ok(response.body.singleResult.errors);
  assert.equal(
    response.body.singleResult.errors[0].error,
    "User does not exist"
  );
});
