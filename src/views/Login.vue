<template>
	<v-content
			class="grey lighten-4"
			@keyup.enter.native="btnAction[tab]()"
	>
	<v-snackbar
			v-model="snackbar"
			:color="snackbarColor"
			:timeout="timeout"
			top
	>
		{{ snackbarText }}
		<v-btn
				dark
				text
				@click="closeSnackbar"
		>
				Закрыть
		</v-btn>
	</v-snackbar>
		<v-container
				fill-height
				fluid
		>
			<v-row no-gutters>
				<v-col>
					<v-row justify="center" no-gutters>
						<v-card class="elevation-12" width="400">
							<v-card-title
							class="grey lighten-2"
							>
								<h1 @click="window = windows.main" class="logo font-weight-bold headline red--text text--darken-4" title="SCHEME">
									SCHEME
								</h1>

							</v-card-title>
							<v-window
								v-model="window"
								vertical
								reverse
								show-arrows
							>
								<v-window-item key="0" :value="windows.main">
									<v-tabs
										v-model="tab"
										background-color="grey lighten-4"
										:color="tabColor[tab]"
										centered
										grow
									>

										<v-tab
												href="#login"
												class="text-capitalize"
										>
												{{ tabText.login }}
										</v-tab>

										<v-tab
												href="#signup"
												class="text-capitalize"
										>
												{{ tabText.signup }}
										</v-tab>

										<v-tab-item
												value="login"
										>
												<v-card-text>

												<v-form
														ref="loginForm"
														v-model="validLogin"
														lazy-validation
												>
														<v-text-field
															v-model="email"
															:rules="emailRules"
															label="Ваш адрес эл. почты"
															prepend-icon="mdi-email"
															type="email"
															required
														></v-text-field>

														<v-text-field
															v-model="loginPassword"
															:rules="passRules"
															label="Пароль"
															prepend-icon="mdi-lock"
															type="password"
															required
														></v-text-field>

														<v-row align="baseline" justify="space-between" no-gutters>
															<v-switch v-model="rememberMe" label="Запомнить меня"></v-switch>
													
															<v-btn
																text
																small
																color="primary"
																@click="window = windows.forgotPassword"
															>
																<span class="text-capitalize mr-1">Забыли</span>
																<span class="text-lowercase">пароль?</span>
															</v-btn>
															
														</v-row>

												</v-form>

												</v-card-text>
										</v-tab-item>

										<v-tab-item
											value="signup"
										>
											<v-card-text>

												<v-form
													ref="signupForm"
													v-model="validSignup"
													lazy-validation
												>
													<v-text-field
														v-model="givenName"
														:rules="givenNameRules"
														label="Ваше имя"
														prepend-icon="mdi-account"
														type="text"
														required
													></v-text-field>

													<v-text-field
														v-model="familyName"
														:rules="familyNameRules"
														label="Ваша фамилия"
														prepend-icon="mdi-account"
														type="text"
														required
													></v-text-field>

													<v-text-field
														v-model="email"
														:rules="emailRules"
														label="Ваш адрес эл. почты"
														prepend-icon="mdi-email"
														type="email"
														required
													></v-text-field>

													<v-text-field
														v-model="signupPassword"
														:rules="passSignRules"
														label="Пароль"
														prepend-icon="mdi-lock"
														type="password"
														required
													></v-text-field>

													<v-text-field
														v-model="passwordRepeat"
														:rules="passRepeatRules(signupPassword)"
														label="Повторите пароль"
														prepend-icon="mdi-lock"
														type="password"
														required
													></v-text-field>

													<v-checkbox
														v-model="privatePolicy"
														:rules="privatePolicyRules"
													>
														<template v-slot:label>
															<div>
																Я прочитал и согласен с условиями
																<v-dialog
																	v-model="dialog"
																	width="500"
																>
																	<template v-slot:activator="{ on }">
																	<span
																		id="privacy-policy"
																		v-on="on"
																		class="text-underline"
																	>
																		пользовательского соглашения.
																	</span>
																	</template>

																	<v-card>
																		<v-card-title
																			class="headline grey lighten-2"
																			primary-title
																		>
																			Политика конфиденциальности
																		</v-card-title>

																		<v-card-text v-html="privatePolicyHtml"></v-card-text>

																		<v-divider></v-divider>

																		<v-card-actions>
																			<v-spacer></v-spacer>
																			<v-btn
																				color="primary"
																				text
																				@click="dialog = false"
																			>
																				ОК
																			</v-btn>
																		</v-card-actions>
																	</v-card>
																</v-dialog>	
															</div>
														</template>

													</v-checkbox>

												</v-form>

											</v-card-text>
										</v-tab-item>
									</v-tabs>

									<v-container>
										<v-row >
											<v-col>

												<v-btn
													color="#4285F4"
													dark
													small
													tile
													depressed
													block
													@click="googleLogin"
												>
													<v-icon left>mdi-google</v-icon>
													<span class="text-capitalize mr-1">{{ tabText[tab] }}</span>
													<span class="text-lowercase mr-1">с помощью</span>
													<span class="text-capitalize">google</span>
													<v-icon right>mdi-chevron-right</v-icon>
												</v-btn>

											</v-col>
											<v-col>

												<v-btn
													color="#4267B2"
													dark
													small
													tile
													depressed
													block
													@click="facebookLogin"
												>
													<v-icon left>mdi-facebook</v-icon>
													<span class="text-capitalize mr-1">{{ tabText[tab] }}</span>
													<span class="text-lowercase mr-1">с помощью</span>
													<span class="text-capitalize">facebook</span>
													<v-icon right>mdi-chevron-right</v-icon>
												</v-btn>

											</v-col>
										</v-row>
									</v-container>

									<v-btn
										tile
										x-large
										depressed
										block
										:color="tabColor[tab]"
										:loading="loading"
										@click="btnAction[tab]()"
									>
										{{ tabText[tab] }}
										<v-icon right>{{ btnIcon[tab] }}</v-icon>
									</v-btn>
								</v-window-item>

								<v-window-item key="1" class="text-center" :value="windows.accountConfirmation">
									<v-icon size="140" class="my-5" color="warning">mdi-account-alert</v-icon>
									<v-card-subtitle>
										Подтвердите Ваш аккаунт
									</v-card-subtitle>
									<v-divider></v-divider>
									<v-card-text>
										<p>На почту <a :href="`mailto:${ email }`">{{ email }}</a> было отправлено письмо с инструкцией для дальнейшего подтверждения Вашего аккаунта.
										Следуйте инструкции для успешного завершения регистрации.</p>
										<p class="mb-0">Если письмо не пришло, отправьте письмо повторно, нажав на кнопку ниже.</p>
									</v-card-text>
									<v-divider></v-divider>
									<v-card-actions>
										<v-btn text small @click="window = windows.main"><v-icon left>mdi-arrow-left-bold</v-icon>Вход</v-btn>
										<v-spacer></v-spacer>
										<v-btn 
											text 
											small 
											:loading="loading"
											@click="sendConfirmationEmail"
										>
											Отправить
											<v-icon right>mdi-email-send-outline</v-icon>
										</v-btn>
									</v-card-actions>
								</v-window-item>

								<v-window-item key="2" class="text-center" :value="windows.accountNotConfirmed">
									<v-icon size="140" class="my-5" color="error">mdi-account-off</v-icon>
									<v-card-subtitle>
										Аккаунт не подтвержден
									</v-card-subtitle>
									<v-divider></v-divider>
									<v-card-text>
										<p>Аккаунт не был подтвержден. Для его подтверждения, введите адрес эл. почты, который соответствует Вашему аккаунту.</p>
										<v-form
											ref="confirmationForm"
											v-model="validConfirmation"
											lazy-validation
										>
											<v-text-field
												v-model="email"
												:rules="emailRules"
												label="Ваш адрес эл. почты"
												prepend-icon="mdi-email"
												type="email"
												required
											></v-text-field>
										</v-form>
									</v-card-text>
									<v-divider></v-divider>
									<v-card-actions>
										<v-btn text small @click="window = windows.main"><v-icon left>mdi-arrow-left-bold</v-icon>Вход</v-btn>
										<v-spacer></v-spacer>
										<v-btn 
											text 
											small 
											:loading="loading"
											@click="validateConfirmation"
										>
											Продолжить
											<v-icon right>mdi-arrow-right-bold</v-icon>
										</v-btn>
									</v-card-actions>
								</v-window-item>

								<v-window-item key="3" class="text-center" :value="windows.forgotPassword">
									<v-icon size="140" class="my-5" color="info">mdi-lock-question</v-icon>
									<v-card-subtitle>
										Забыли пароль?
									</v-card-subtitle>
									<v-divider></v-divider>
									<v-card-text>
										<p>Введите адрес эл. почты на которое будет отправлено письмо с инструкцией для восстановления Вашего пароля.</p>
										<v-form
											ref="resetEmailForm"
											v-model="validEmailReset"
											lazy-validation
										>
											<v-text-field
												v-model="email"
												:rules="emailRules"
												label="Ваш адрес эл. почты"
												prepend-icon="mdi-email"
												type="email"
												required
											></v-text-field>
										</v-form>
									</v-card-text>
									<v-divider></v-divider>
									<v-card-actions>
										<v-btn text small @click="window = windows.main"><v-icon left>mdi-arrow-left-bold</v-icon>Вход</v-btn>
										<v-spacer></v-spacer>
										<v-btn 
											text 
											small 
											:loading="loading"
											@click="validateEmailReset"
										>
											Продолжить
											<v-icon right>mdi-arrow-right-bold</v-icon>
										</v-btn>
									</v-card-actions>
								</v-window-item>

								<v-window-item key="4" class="text-center" :value="windows.passwordReset">
									<v-icon size="140" class="my-5" color="info">mdi-shield-lock</v-icon>
									<v-card-subtitle>
										Восстановление пароля
									</v-card-subtitle>
									<v-divider></v-divider>
									<v-card-text>
										<p>На почту <a :href="`mailto:${ email }`">{{ email }}</a> было отправлено письмо с инструкцией для восстановления пароля.
										Следуйте инструкции для успешного завершения операции.</p>
										<p class="mb-0">Если письмо не пришло, отправьте письмо повторно, нажав на кнопку ниже.</p>
									</v-card-text>
									<v-divider></v-divider>
									<v-card-actions>
										<v-btn text small @click="window = windows.main"><v-icon left>mdi-arrow-left-bold</v-icon>Вход</v-btn>
										<v-spacer></v-spacer>
										<v-btn 
											text 
											small 
											:loading="loading"
											@click="sendEmailReset"
										>
											Отправить
											<v-icon right>mdi-email-send-outline</v-icon>
										</v-btn>
									</v-card-actions>
								</v-window-item>

								<v-window-item key="5" class="text-center" :value="windows.passwordCreate">
									<v-icon size="140" class="my-5" color="info">mdi-textbox-password</v-icon>
									<v-card-subtitle>
										Создание нового пароля
									</v-card-subtitle>
									<v-divider></v-divider>
									<v-card-text>
										<p>Для смены старого пароля на новый, введите новый пароль в поле ниже.</p>
										<v-form
											ref="resetPasswordForm"
											v-model="validPasswordReset"
											lazy-validation
										>
											<v-text-field
												v-model="newPassword"
												:rules="passSignRules"
												label="Пароль"
												prepend-icon="mdi-lock"
												type="password"
												required
											></v-text-field>

											<v-text-field
												v-model="newPasswordRepeat"
												:rules="passRepeatRules(newPassword)"
												label="Повторите пароль"
												prepend-icon="mdi-lock"
												type="password"
												required
											></v-text-field>
										</v-form>
									</v-card-text>
									<v-divider></v-divider>
									<v-card-actions>
										<v-btn text small @click="window = windows.main"><v-icon left>mdi-arrow-left-bold</v-icon>Вход</v-btn>
										<v-spacer></v-spacer>
										<v-btn 
											text 
											small 
											:loading="loading"
											@click="validateChangePassword"
										>
											Сохранить
											<v-icon right>mdi-lock-reset</v-icon>
										</v-btn>
									</v-card-actions>
								</v-window-item>

								<v-window-item key="6" class="text-center" :value="windows.passwordSuccess">
									<v-icon size="140" class="my-5" color="success">mdi-shield-check</v-icon>
									<v-card-subtitle>
										Пароль был успешно изменен
									</v-card-subtitle>
									<v-divider></v-divider>
									<v-card-text>
										<p>Восстановление пароля успешно завершено. Теперь Вы можете выполнить вход в свой аккаунт используя новый пароль.</p>
									</v-card-text>
									<v-divider></v-divider>
									<v-card-actions>
										<v-btn text small @click="window = windows.main"><v-icon left>mdi-arrow-left-bold</v-icon>Вход</v-btn>
									</v-card-actions>
								</v-window-item>
							</v-window>	
						</v-card>
					</v-row>
				</v-col>
			</v-row>
		</v-container>
	</v-content>
</template>

<script>
import Api from '@/Api'
import { mapGetters } from 'vuex'
import { SNACKBAR_ON, SNACKBAR_OFF, SNACKBAR_SUCCESS, SNACKBAR_ERROR } from '@/mutation.types'
export default {
	name: 'Login',
	data: () => ({
		dialog: false,
		timeout: 6000,
		validLogin: true,
		validSignup: true,
		validConfirmation: true,
		validEmailReset: true,
		validPasswordReset: true,
		tab: null,
		tabColor: {
			login: 'primary',
			signup: 'success'
		},
		tabText: {
			login: 'Войти',
			signup: 'Зарегистрироваться'
		},
		btnIcon: {
			login: 'mdi-login',
			signup: 'mdi-pencil'
		},
		givenName: 'Иван',
		familyName: 'Агура',
		email: 'agura.iv@gmail.com',
		loginPassword: '',
		rememberMe: false,
		signupPassword: 'admin1111',
		passwordRepeat: 'admin1111',
		newPassword: '',
		newPasswordRepeat: '',
		privatePolicy: false,
		privatePolicyHtml: '',
		givenNameRules: [
			v => !!v || 'Необходимо ввести имя',
			v => v.length <= 32 || 'Не более 32 символов'
		],
		familyNameRules: [
			v => !!v || 'Необходимо ввести фамилию',
			v => v.length <= 32 || 'Не более 32 символов'
		],
		emailRules: [
			v => !!v || 'Необходимо ввести адрес эл. почты',
			v => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'Недопустимый адрес эл. почты'
		],
		passRules: [ v => !!v || 'Необходимо ввести пароль' ],
		privatePolicyRules: [ v => !!v || 'Неодходимо Ваше согласие'],
		window: 0,
		windows: {
			main: 0,
			accountConfirmation: 1,
			accountNotConfirmed: 2,
			forgotPassword: 3,
			passwordReset: 4,
			passwordCreate: 5,
			passwordSuccess: 6,
		},
		resetToken: ''
	}),
	computed: {
		...mapGetters(['loading', 'snackbarText', 'snackbarColor']),
		snackbar: {
			get() {
				return this.$store.getters.snackbar
			},
			set(val) {
				val ? this.$store.commit(SNACKBAR_ON) : this.$store.commit(SNACKBAR_OFF)
			}
		},
		passSignRules() {
			return [
				...this.passRules,
				v => !(/\s/.test(v)) || 'Пароль содержит пробельный символ',
				v => /^[a-zA-z0-9!@#$%^&\-_~*+=]+$/.test(v) || 'Пароль содержит недопустимые символы',
				v => /[a-z]/.test(v) || 'Пароль должен содержать минимум одну латинскую букву в нижнем регистре',
				// v => /[A-Z]/.test(v) || 'Пароль должен содержать минимум одну латинскую букву в верхнем регистре',
				v => /[0-9]/.test(v) || 'Пароль должен содержать минимум одну цифру',
				// v => /[!@#$%^&\-_~*+=]/.test(v) || 'Пароль должен содержать минимум один спец. символ: ! @ # $ % ^ & - _ ~ * + =',
				v => v.length >= 8 || 'Пароль должен быть не менее 8 символов',
				v => v.length <= 32 || 'Пароль должен быть не более 32 символов'
			]
		},
		passRepeatRules: () => password => {
			return [
				v => !!v || 'Введите пароль еще раз',
				v => v === password || 'Пароль не совпадает с введенным выше'
			]
		},
		btnAction() {
			return {
				login: this.validateLogin,
				signup: this.validateSignup
			}
		},
		queryActions() {
			return {
				confirmation: this.checkConfirmation,
				resetToken: this.checkResetToken
			}
		}
	},
	created() {

		Object.entries(this.$route.query).forEach(this.queryHandler)

		this.getPrivacyPolicy()
			.then(({ data }) => { this.privatePolicyHtml = data })
			.catch(err => { this.privatePolicyHtml = err.message })
	},
	methods: {

		queryHandler([param, value]) {
			if (param in this.queryActions) this.queryActions[param](value)
		},

		checkResetToken(token) {
			Api.get('/check_reset_token', { params: { token } })
				.then(() => {
					this.resetToken = token
					this.window = this.windows.passwordCreate
				})
		},

		validateChangePassword() {
			if (this.$refs.resetPasswordForm.validate()) {
				Api.post('/change_password', {
					token: this.resetToken,
					newPassword: this.newPassword
				})
				.then(() => {
					this.window = this.windows.passwordSuccess
				})			
			}
		},

		sendEmailReset(event) {
			const promise = Api.get('/send_email_reset', {
				params: { email: this.email }
			})
			return !event && promise		
		},

		validateEmailReset() {
			if (this.$refs.resetEmailForm.validate()) {
				this.sendEmailReset()
					.then(() => {
						this.window = this.windows.passwordReset
					})
			}
		},

		checkConfirmation(token) {
			Api.post('/email_confirm', { token })
				.then(() => {
					location.replace('https://scheme.com.ua')
				})
				.catch(() => {
					this.window = this.windows.accountNotConfirmed
				})		
		},

		sendConfirmationEmail(event) {
			const promise = Api.get('/send_confirmation_email', {
				params: { email: this.email }
			})
			return !event && promise
		},

		validateConfirmation() {
			if (this.$refs.confirmationForm.validate()) {
				this.sendConfirmationEmail()
				.then(() => {
					this.window = this.windows.accountConfirmation
				})
			}
		},

		validateLogin() {
			if (this.$refs.loginForm.validate()) {
				Api.post('/login', {
					email: this.email,
					password: this.loginPassword
				})
				.then(() => {
					this.loginPassword = ''
					this.$store.commit(SNACKBAR_SUCCESS, {
						text: 'Успешная аутентификация'
					})
				})
				.catch(error => {
					if (error.response.data.name === 'emailVerifiedFails') {
						this.sendConfirmationEmail()
						.then(() => {
							this.window = this.windows.accountConfirmation
						})
					}
				})	
			}
		},

		validateSignup() {
			if (this.$refs.signupForm.validate()) {
				Api.post('/register', {
					givenName: this.givenName,
					familyName: this.familyName,
					email: this.email,
					password: this.signupPassword
				})
				.then(() => {
					this.signupPassword = ''
					return this.sendConfirmationEmail()
				})
				.then(() => {
					this.$store.commit(SNACKBAR_SUCCESS, {
						text: 'Успешная аутентификация'
					})
					this.window = this.windows.accountConfirmation
				})	
			}
		},

		googleLogin() {
			this.$popup.open('/auth/google')
			.then(() => {
				this.$store.commit(SNACKBAR_SUCCESS, {
					text: 'Успешная аутентификация'
				})
			})
			.catch(error => {
				this.$store.commit(SNACKBAR_ERROR, {
					text: error.message
				})
			})
			.finally(() => this.$popup.window.close())
		},

		facebookLogin() {
			this.$popup.open('/auth/facebook')
			.then(() => {
				this.$store.commit(SNACKBAR_SUCCESS, {
					text: 'Успешная аутентификация'
				})
			})
			.catch(error => {
				this.$store.commit(SNACKBAR_ERROR, {
					text: error.message
				})
			})
			.finally(() => this.$popup.window.close())
		},

		getPrivacyPolicy(event) {
			const promise = Api.get('https://scheme.com.ua/privacy_policy.html')
			return !event && promise
		},

		closeSnackbar() {
			this.$store.commit(SNACKBAR_OFF)
		}
	}
}
</script>
<style scoped>
.logo {
	cursor: pointer;
}
#privacy-policy {
  text-decoration: underline;
}
</style>
