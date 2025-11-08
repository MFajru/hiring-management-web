const formatToIdr = (num: number | string) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(num as number);
};

export default formatToIdr;
