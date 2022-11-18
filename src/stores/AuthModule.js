import axios from "axios";
import config from "../config/index.js"
import router from "../router/index"
import Swal from 'sweetalert2'

const AuthModule = {
    state: {
        isLogin: false,
    },
    mutations: {
        LOGOUT(state){
            state.isLogin=false;
        },
        LOGIN(state){
            state.isLogin=true;
        }
    },
    actions: {
        logout({ commit }) {
            localStorage.clear();
            commit("LOGOUT");
        },
        async login({ commit }, account) {
            try {
                const response = await axios.post(`${config.server}/auth/login`, {
                    email: account.email,
                    password: account.password,
                });
               // alert("Bạn đã đăng nhập thành công!!!");
               
                const accessToken = response.data.accessToken;
                const accountInfor = response.data.account;
                
            //if valid account push to home page
            if (response.data.accessToken) {
                localStorage.setItem("token", accessToken);
                commit("LOGIN");
                // Save account login to store account
                commit("SET_ACCOUNT", accountInfor);      
                router.push('/home');  
                //alert success login notification
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'bottom-end',
                    showConfirmButton: false,
                    timer: 3000,
                    didOpen: (toast) => {
                      toast.addEventListener('mouseenter', Swal.stopTimer)
                      toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                  });
                Toast.fire({
                    icon: 'success',
                    title: 'Đăng nhập thành công'
                  });       
            }
            } catch (error) {
                Swal.fire("", "Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin đăng nhập", "error")
                console.log(error);
            }
        },
        async register({commit}, account){
           try {
            //register new account and navigate user to login page to login 
             await axios.post(`${config.server}/auth/register`,{
                username: account.username,
                email: account.email,
                password: account.password
               });

               await Swal.fire("","Bạn đã đăng ký tài khoản thành công!!!", "success");
               router.push({name: 'login'});
           } catch (error) {
            await Swal.fire("","Tài khoản đã tồn tại. Xin vui lòng kiểm tra lại tên tài khoản", "error");
            console.log(error);
           }
        },
        logout() {
            Swal.fire({
                title: 'Đăng xuất',
                text: 'Bạn có muốn đăng xuất?',
                showDenyButton: true,
                confirmButtonColor: "#DC3741",
                denyButtonColor: "#BDB8B7",
                confirmButtonText: 'Đăng xuất',
                denyButtonText: `Không`,
            }).then((result) => {
                if (result.isConfirmed) {
                    localStorage.clear();
                    router.push('/');
                }
            })
        },
    }
}

export default AuthModule;