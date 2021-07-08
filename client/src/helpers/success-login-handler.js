export default function(data, vm) {
  vm.$swal.fire({
    title: 'Login success',
    timer: 1500,
    icon: 'success',
    showConfirmButton: false,
  })

  vm.$emit('updateUserStatus', {
    token: data.token,
    username: data.username,
    type: 'login',
  })

  vm.$router.push('/user/all-articles')
}
