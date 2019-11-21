import faker from 'faker'


export default function fakeData(len) {
    const arr = [];
    for (let i = 0; i < len; i++) {
        arr.push({
            id: i,
            name: faker.name.findName(),
            email: faker.internet.email(),
            phone: faker.phone.phoneNumber('0#########')
        })
    }
    return arr;
}