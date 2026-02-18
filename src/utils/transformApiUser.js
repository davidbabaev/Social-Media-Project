
export function transformApiUser(apiUser) {
  return{
    userId: apiUser.login.uuid,
    name: apiUser.name.first,
    lastName: apiUser.name.last,
    email: apiUser.email,
    password: apiUser.login.password,
    country: apiUser.location.country,
    photo: apiUser.picture.large,
    age: apiUser.dob.age,
    gender: apiUser.gender,
    phone: apiUser.phone,
    source: 'API',
    createdAt: new Date().toISOString(),
  }
}
