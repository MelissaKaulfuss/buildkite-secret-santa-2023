const fs = require("fs");
const assert = require("assert");
const secretSanta = require("./secret-santa");
const jobEventProcesssor = require("./job-event-processor").process;

describe("secretSanta.calculate", function () {
  describe("with a valid payload body", function () {
    const payload = JSON.parse(
      fs.readFileSync("test-fixtures/job-finished-payload.json")
    );

    test("returns the list", function () {
      const secretSantaList = secretSanta.calculate(
        42,
        jobEventProcesssor(payload)
      );
      console.log(JSON.stringify(secretSantaList));
      assert.deepEqual(
        [
          {
            name: "Baz",
            email: "chris@buildkite.com",
            received: {
              name: "Mitch",
              hint: "Mitch's hint",
              address: "Mitch's address",
            },
          },
          {
            name: "Mitch",
            email: "mitch@buildkite.com",
            received: {
              name: "Mel",
              hint: "Mel's hint",
              address: "Mel's address",
            },
          },
          {
            name: "Mel",
            email: "mel@buildkite.com",
            received: {
              name: "Brett",
              hint: "Bretts's hint",
              address: "Bretts's address",
            },
          },
          {
            name: "Brett",
            email: "brett@buildkite.com",
            received: {
              name: "MHz",
              hint: "MHz's hint",
              address: "MHz's address",
            },
          },
          {
            name: "MHz",
            email: "michelle@buildkite.com",
            received: {
              name: "Hannah",
              hint: "Hannah's hint",
              address: "Hannah's address",
            },
          },
          {
            name: "Hannah",
            email: "hannah@buildkite.com",
            received: {
              name: "Michael",
              hint: "Michael's hint",
              address: "Michael's address",
            },
          },
          {
            name: "Michael",
            email: "michael@buildkite.com",
            received: {
              name: "Ben",
              hint: "Ben's hint",
              address: "Ben's address",
            },
          },
          {
            name: "Ben",
            email: "ben@buildkite.com",
            received: {
              name: "Chris",
              hint: "Chris's hint",
              address: "Chris's address",
            },
          },
          {
            name: "Chris",
            email: "chris.c@buildkite.com",
            received: {
              name: "Baz",
              hint: "Baz's hint",
              address: "Baz's address",
            },
          },
        ],
        secretSantaList
      );

      assert.equal(
        "Hi!\n\nYou received:\nMitch\n\nTheir xmas pressie hint:\nMitch's hint\n\nTheir delivery address:\nMitch's address\n\nLots of love,\nSanta’s Magical Unicorns",
        secretSanta.message(secretSantaList[0])
      );
    });
  });

  describe("with a payload body for a non-unicorn event", function () {
    const payload = JSON.parse(
      fs.readFileSync("test-fixtures/job-finished-incorrect-payload.json")
    );

    test("returns null", function () {
      const secretSantaList = secretSanta.calculate(
        42,
        jobEventProcesssor(payload)
      );

      assert.equal(null, secretSantaList);
    });
  });

  describe("with a payload body for a build.finished event", function () {
    const payload = JSON.parse(
      fs.readFileSync("test-fixtures/build-finished-payload.json")
    );

    test("returns null", function () {
      const secretSantaList = secretSanta.calculate(
        42,
        jobEventProcesssor(payload)
      );

      assert.equal(null, secretSantaList);
    });
  });
});
