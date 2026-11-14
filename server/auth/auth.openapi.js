/**
 * @swagger
 * components:
 *   securitySchemes:
 *     refreshCookie:
 *       type: apiKey
 *       in: cookie
 *       name: refreshToken
 *
 *   schemas:
 *     AuthUser:
 *       type: object
 *       description: Public user object without sensitive fields.
 *       additionalProperties: true
 *
 *     AuthError:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *           example: Invalid credentials.
 *         details:
 *           type: object
 *           additionalProperties: true
 *
 * paths:
 *   /auth/register:
 *     post:
 *       tags:
 *         - Auth
 *       summary: Register a new account
 *       operationId: registerUser
 *       security: []
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - username
 *                 - email
 *                 - password
 *               properties:
 *                 username:
 *                   type: string
 *                   minLength: 3
 *                   maxLength: 30
 *                   pattern: '^[a-zA-Z0-9_]+$'
 *                   example: impervious_demo
 *                 email:
 *                   type: string
 *                   format: email
 *                   maxLength: 254
 *                   example: demo@example.com
 *                 password:
 *                   type: string
 *                   minLength: 8
 *                   maxLength: 128
 *                   format: password
 *                   example: ExamplePass123!
 *                 fullName:
 *                   type: string
 *                   maxLength: 255
 *                   example: Demo User
 *       responses:
 *         '201':
 *           description: Account created successfully.
 *           headers:
 *             Set-Cookie:
 *               description: HttpOnly refresh token cookie.
 *               schema:
 *                 type: string
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                     example: true
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                     properties:
 *                       user:
 *                         $ref: '#/components/schemas/AuthUser'
 *                       accessToken:
 *                         type: string
 *         '400':
 *           description: Invalid registration data.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/AuthError'
 *         '409':
 *           description: Email or username already exists.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/AuthError'
 *         '429':
 *           description: Too many requests.
 *
 *   /auth/login:
 *     post:
 *       tags:
 *         - Auth
 *       summary: Login to an existing account
 *       operationId: loginUser
 *       security: []
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - email
 *                 - password
 *               properties:
 *                 email:
 *                   type: string
 *                   format: email
 *                   example: demo@example.com
 *                 password:
 *                   type: string
 *                   format: password
 *                   example: ExamplePass123!
 *       responses:
 *         '200':
 *           description: Login successful.
 *           headers:
 *             Set-Cookie:
 *               description: HttpOnly refresh token cookie.
 *               schema:
 *                 type: string
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                     example: true
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                     properties:
 *                       user:
 *                         $ref: '#/components/schemas/AuthUser'
 *                       accessToken:
 *                         type: string
 *         '400':
 *           description: Invalid request data.
 *         '401':
 *           description: Invalid email or password.
 *         '403':
 *           description: Account is disabled.
 *         '429':
 *           description: Too many requests.
 *
 *   /auth/refresh:
 *     post:
 *       tags:
 *         - Auth
 *       summary: Refresh the current authentication session
 *       operationId: refreshUserSession
 *       security:
 *         - refreshCookie: []
 *       responses:
 *         '200':
 *           description: Session refreshed and refresh token rotated.
 *           headers:
 *             Set-Cookie:
 *               description: New HttpOnly refresh token cookie.
 *               schema:
 *                 type: string
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                     example: true
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                     properties:
 *                       user:
 *                         $ref: '#/components/schemas/AuthUser'
 *                       accessToken:
 *                         type: string
 *         '401':
 *           description: Refresh token is missing, invalid, or expired.
 *
 *   /auth/me:
 *     get:
 *       tags:
 *         - Auth
 *       summary: Get the currently authenticated user
 *       operationId: getCurrentUser
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         '200':
 *           description: Current user retrieved successfully.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                     example: true
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                     properties:
 *                       user:
 *                         $ref: '#/components/schemas/AuthUser'
 *         '401':
 *           description: Missing or invalid access token.
 *
 *   /auth/logout:
 *     post:
 *       tags:
 *         - Auth
 *       summary: Logout the current session
 *       operationId: logoutUser
 *       description: Reads the refresh token cookie when present. Logout is idempotent.
 *       security: []
 *       responses:
 *         '200':
 *           description: Logout completed and refresh cookie cleared.
 *           headers:
 *             Set-Cookie:
 *               description: Clears the refresh token cookie.
 *               schema:
 *                 type: string
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                     example: true
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                     properties:
 *                       loggedOut:
 *                         type: boolean
 *                         example: true
 */
