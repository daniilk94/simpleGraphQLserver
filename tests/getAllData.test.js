import test from "node:test";
import assert from "node:assert";
import { server } from "../apidefs.js";
import { getUsers } from "../databases/db.js";

//Returns all data
test("getAllData returns all data", async () => {
  await server.start();
  const query = `
        query {
            getAllData {
                id
                forename
                surname
            }
        }
    `;
  const response = await server.executeOperation(
    {
      query,
    },
    { contextValue: { user: { username: "jk" } } }
  );

  await server.stop();
  const expectedUsers = getUsers();
  assert.ok(response.body.singleResult.data);
  assert.deepEqual(response.body.singleResult.data.getAllData, expectedUsers);
});
