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


//Updates data. Id is free => creates new user
test("updateData creates new user if provided id is free", async () => {

  const mutation = `
        mutation ($id: ID!, $forename: String!, $surname: String!) {
            updateData(id: $id, forename: $forename, surname: $surname) {
                id
                forename
                surname
            }
        }
    `;

  const response = await server.executeOperation(
    {
      query: mutation,
      variables: {id: "4", forename: "Frank", surname: "Lampard" },
    },
    { contextValue: { user: { username: "jk" } } }
  );



  const expectedUser = getUserById(4);

  assert.ok(response.body.singleResult.data);
  assert.equal(response.body.singleResult.data.updateData.id, "4");
  assert.equal(response.body.singleResult.data.updateData.forename, "Frank");
  assert.equal(response.body.singleResult.data.updateData.surname, "Lampard");
  assert.ok(expectedUser);
  assert.equal(expectedUser.forename, "Frank");
});

//Updates data. Id is not free => updates user with new forename and surname
test("updateData updates user with new forename and surname if id is not free", async () => {

  const mutation = `
        mutation ($id: ID!, $forename: String!, $surname: String!) {
            updateData(id: $id, forename: $forename, surname: $surname) {
                id
                forename
                surname
            }
        }
    `;

  const response = await server.executeOperation(
    {
      query: mutation,
      variables: {id: "3", forename: "Petri", surname: "Laitinen" },
    },
    { contextValue: { user: { username: "jk" } } }
  );



  const expectedUser = getUserById(3);

  assert.ok(response.body.singleResult.data);
  assert.equal(response.body.singleResult.data.updateData.id, "3");
  assert.equal(response.body.singleResult.data.updateData.forename, "Petri");
  assert.equal(response.body.singleResult.data.updateData.surname, "Laitinen");
  assert.ok(expectedUser);
  assert.equal(expectedUser.forename, "Petri");
});