import test from "node:test";
import assert from "node:assert";
import { server } from "../apidefs.js";

test.before(async () => {
  await server.start();
});
test.after(async () => {
  await server.stop();
});

//Search user by a forename with existing user
test("searchUser returns all users with given forename", async () => {
  const query = `
        query ($forename: String!) {
            searchUser(forename: $forename) {
                id
                forename
                surname
            }
        }
    `;

  const response = await server.executeOperation(
    {
      query,
      variables: { forename: "Roy" },
    },
    { contextValue: { user: { username: "jk" } } }
  );

  assert.ok(response.body.singleResult.data);
  assert.equal(response.body.singleResult.data.searchUser[0].id, "1");
  assert.equal(
    response.body.singleResult.data.searchUser[0].surname,
    "Fielding"
  );
});

//Search user by a forename with non-existing user
test("searchUser returns empty list if users were no found", async () => {
  const query = `
        query ($forename: String!) {
            searchUser(forename: $forename) {
                id
                forename
                surname
            }
        }
    `;

  const response = await server.executeOperation(
    {
      query,
      variables: { forename: "Frank" },
    },
    { contextValue: { user: { username: "jk" } } }
  );

  assert.ok(response.body.singleResult.data);
  assert.deepEqual(response.body.singleResult.data.searchUser, []);
});
