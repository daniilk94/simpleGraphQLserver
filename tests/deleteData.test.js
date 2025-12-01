import test from "node:test";
import assert from "node:assert";
import { server } from "../apidefs.js";
import { getUserById } from "../databases/db.js";

test.before(async () => {
  await server.start();
});
test.after(async () => {
  await server.stop();
});

//Delete data by id
test("deleteData deletes data by given id", async () => {
  const mutation = `
        mutation ($id: ID!) {
            deleteData(id: $id) {
                id
                forename
                surname
            }
        }
    `;

  const response = await server.executeOperation(
    {
      query: mutation,
      variables: { id: "3" },
    },
    { contextValue: { user: { username: "jk" } } }
  );

  const expectedEmptySlot = getUserById(3);

  assert.ok(response.body.singleResult.data);
  assert.equal(response.body.singleResult.data.deleteData.id, "3");
  assert.equal(response.body.singleResult.data.deleteData.forename, "Jyri");
  assert.equal(
    response.body.singleResult.data.deleteData.surname,
    "Kemppainen"
  );
  assert.equal(expectedEmptySlot, null);
});

//Delete data by wrong id
test("deleteData returns error because there is no such record", async () => {
  const mutation = `
        mutation ($id: ID!) {
            deleteData(id: $id) {
                id
                forename
                surname
            }
        }
    `;

  const response = await server.executeOperation(
    {
      query: mutation,
      variables: { id: "777" },
    },
    { contextValue: { user: { username: "jk" } } }
  );

  assert.equal(response.body.singleResult.data.deleteData, null);
  assert.ok(response.body.singleResult.errors);
  assert.equal(
    response.body.singleResult.errors[0].error,
    "Record does not exist"
  );
});
