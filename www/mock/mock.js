module.exports = {
  rules: [
    {
      pattern: /\/api\/home_list\.php\?pageNo=0/,
      respondwith: './home_list1.json'
    },
    {
      pattern: /\/api\/home_list\.php\?pageNo=1/,
      respondwith: './home_list2.json'
    },
    {
      pattern: /\/api\/home_list\.php\?pageNo=2/,
      respondwith: './home_list3.json'
    }
  ]
};
