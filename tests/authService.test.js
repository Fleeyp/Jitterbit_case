require("dotenv").config();

const authService = require("../services/authService");

describe("AuthService", () => {

    test("should generate token with valid credentials", async () => {

        const token = await authService.login("admin", "123456");

        expect(token).toBeDefined();

    });

});