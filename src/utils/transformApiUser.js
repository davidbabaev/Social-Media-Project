
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
    coverImage: 'https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png',
    age: apiUser.dob.age,
    job: 'job',
    gender: apiUser.gender,
    birthDate: apiUser.dob.date?.split("T")[0] || '',
    phone: apiUser.phone,
    aboutMe: 'aboutMe',
    source: 'API',
    createdAt: new Date().toISOString(),
  }
}
