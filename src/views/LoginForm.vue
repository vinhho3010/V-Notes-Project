<template>
  <div class="page">
    <div class="w-screen">
      <div class="w-full">
        <Header state="logInForm" />
      </div>
    </div>
    <section class="h-auto">
      <div class="px-6 h-[90%]">
        <div class="flex justify-center items-center flex-wrap h-full mt-20 g-6 text-gray-800">
          <div class="md:w-4/12 lg:w-4/12 py-5 px-8 rounded-xl shadow-2xl">
            <Form :validation-schema="loginFormSchema"
                  @submit="login(this.account)">
              <div class="text-center font-semibold text-2xl py-4">Đăng nhập</div>
              <!-- Email input -->
              <div class="mb-6">
                <div class="mb-1">
                  <label for="email" class="text-lg">Email</label>
                </div>
                <Field
                  name="email"
                  v-model="account.email"
                  type="email"
                  class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="example@gmail.com" />
                  <ErrorMessage name="email" class="error-feedback" />
              </div>

              <!-- Password input -->
              <div class="mb-6">
                <div class="mb-1">
                  <label for="password" class="text-lg">Mật khẩu</label>
                </div>
                <Field
                name="password"
                  v-model="account.password" type="password"
                  class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Mật khẩu" />
                  <ErrorMessage name="password" class="error-feedback" />
              </div>

              <div class="flex justify-between items-center mb-6">
                <div class="form-group form-check">
                  <input type="checkbox"
                    class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-[#40CB93] checked:border-[#40CB93] focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                    id="rememberAccount" checked />
                  <label class="form-check-label inline-block text-gray-800" for="rememberAccount">Nhớ tài khoản</label>
                </div>
                <a href="#!"
                  class="text-blue-600 hover:text-blue-700 focus:text-blue-700 active:text-blue-800 duration-200 transition ease-in-out">
                  Quên mật khẩu?</a>
              </div>

              <!-- Submit button -->
              <button type="submit"
                class="inline-block px-7 py-3 bg-[#247759] text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-[#175E45] hover:shadow-lg focus:bg-[#175E45] focus:shadow-lg focus:outline-none focus:ring-0 active:bg-[#238E68] active:shadow-lg transition duration-150 ease-in-out w-full"
                data-mdb-ripple="true" data-mdb-ripple-color="light">
                Đăng nhập
              </button>
              <div class="mb-6 mt-3">
                <span class="text-md">Không có tài khoản? </span>               
                   <router-link to="/signup">
                    <span class="text-blue-600">
                      Đăng ký
                    </span>
                  </router-link>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </section>
  </div>

</template>

<script>
import Header from "@/components/Header.vue";
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import { mapActions } from "vuex";

export default {
  name: "LoginForm",
  components: {
    Header,
    Form,
    Field,
    ErrorMessage,
  }, 
   data() {
    const loginFormSchema = yup.object().shape({
      email: yup
        .string()
        .required("Bạn cần nhập Email")
        .email("Email không đúng.")
        .max(50, "Email tối đa 50 ký tự."),
      password: yup.string().required("Bạn cần nhập mật khẩu"),

    });
    return {
      account: {
        email:"",
        password: "",
      }, 
      loginFormSchema,
    };
  },
  methods: {
    ...mapActions({login: "login"}),
  }


};
</script>

<style scoped>
  .error-feedback{
    color: red
  }
</style>
