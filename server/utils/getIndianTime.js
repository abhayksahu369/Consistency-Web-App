

const getIndianTime=(date) => {
    return new Date(date+5.5 * 60 * 60 * 1000);
}

module.exports={getIndianTime}