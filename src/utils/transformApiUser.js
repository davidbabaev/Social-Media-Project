
export function transformApiUser(apiUser) {
  return{
    userId: apiUser.login.uuid,
    name: apiUser.name.first,
    lastName: apiUser.name.last,
    email: apiUser.email,
    password: apiUser.login.password,
    country: apiUser.location.country,
    city: apiUser.location.city,
    photo: apiUser.picture.large,
    coverImage:'https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    age: apiUser.dob.age,
    job: 'job',
    gender: apiUser.gender,
    birthDate: apiUser.dob.date?.split("T")[0] || '',
    phone: apiUser.phone,
    aboutMe: 'aboutMe',
    source: 'API',
    createdAt: new Date().toLocaleDateString(),
  }
}
