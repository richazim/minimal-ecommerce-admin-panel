export const prettyPrint = (value: unknown) => {
    console.log(JSON.stringify(value, null, 2));
}