<template>
  <div class="page">
    <div class="w-full">
      <Header state="signUpForm" />
    </div>
    <section class="h-auto">
      <div class="px-6 h-[90%]">
        <div class="flex justify-center items-center flex-wrap h-full mt-10 g-6 text-gray-800">
          <div class="md:w-4/12 lg:w-4/12 py-5 px-8 rounded-xl shadow-2xl">
            <Form :validation-schema="signupFormSchema"
                  @submit="register(this.account)">
              <div class="text-center font-semibold text-2xl py-4">Đăng ký tài khoản</div>
              <!--UserName input -->
              <div class="mb-4">
                <div class="mb-1">
                  <label for="username" class="text-lg">Tên tài khoản</label>
                </div>
                <Field name="username" v-model="account.username" type="text"
                  class="form-control block w-full px-4 py-1.5 text-lg font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Tên tài khoản" />
                <ErrorMessage name="username" class="error-feedback" />
              </div>
              <!-- Email input -->
              <div class="mb-4">
                <div class="mb-1">
                  <label for="email" class="text-lg">Email</label>
                </div>
                <Field name="email" v-model="account.email" type="text"
                  class="form-control block w-full px-4 py-1.5 text-lg font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Email" />
                <ErrorMessage name="email" class="error-feedback" />
              </div>

              <!-- Password input -->
              <div class="mb-4">
                <div class="mb-1">
                  <label for="password" class="text-lg">Mật khẩu</label>
                </div>
                <Field name="password" v-model="account.password" type="password"
                  class="form-control block w-full px-4 py-1.5 text-lg font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Mật khẩu" />
                <ErrorMessage name="password" class="error-feedback" />
              </div>
              <!-- Password re-input -->
              <div class="mb-4">
                <div class="mb-1">
                  <label for="repassword" class="text-lg">Nhập lại mật khẩu</label>
                </div>
                <Field name="repassword" v-model="account.repassword" type="password"
                  class="form-control block w-full px-4 py-1.5 text-lg font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Nhập lại mật khẩu" />
                <ErrorMessage name="repassword" class="error-feedback" />
              </div>
              <div class="mb-2 mt-2">
                <span class="text-md">Đã có tài khoản? </span>               
                   <router-link to="/login">
                    <span class="text-blue-600">
                      Đăng nhập
                    </span>
                  </router-link>
              </div>

              <!-- Submit button -->
              <button type="submit"
                class="inline-block px-7 py-3 bg-[#247759] text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-[#175E45] hover:shadow-lg focus:bg-[#175E45] focus:shadow-lg focus:outline-none focus:ring-0 active:bg-[#238E68] active:shadow-lg transition duration-150 ease-in-out w-full"
                data-mdb-ripple="true" data-mdb-ripple-color="light">
                Đăng ký tài khoản
              </button>
            </Form>
          </div>
        </div>
      </div>
    </section>
  </div>

</template>

<script>
import Header from '@/components/Header.vue';
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import { mapActions } from 'vuex';
export default {
  
  name: "SignUpForm",
  components: {
    Header,
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const signupFormSchema = yup.object().shape({
      username: yup.string().required("Bạn cần nhập tên tài khoản."),
      email: yup
        .string()
        .required("Bạn cần nhập Email")
        .email("Email không đúng.")
        .max(50, "Email tối đa 50 ký tự."),
      password: yup.string().required('Bạn cần nhập mật khẩu'),
      repassword: yup.string().oneOf([yup.ref('password'), null], 'Mật khẩu phải giống nhau')
    });

    return {
      account: {
        username: "",
        email: "",
        password: "",
        repassword: "",
      }, 
      signupFormSchema,
    }
  },
  methods: {
    ...mapActions({ register: "register" }),
  }

}
</script>

<style scoped>
.error-feedback {
  color: red
}
</style>
