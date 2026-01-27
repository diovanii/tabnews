import bcryptjs from "bcryptjs";
const rounds = getNumberOfRounds();

async function hash(password) {
  const passwordPeppered = await password.concat(process.env.PEPPER);
  const hashedPassword = await bcryptjs.hash(passwordPeppered, rounds);

  return hashedPassword;
}

function getNumberOfRounds() {
  return process.env.NODE_ENV === "production" ? 14 : 1;
}

async function compare(providedPassword, storedPassword) {
  const providedPasswordPeppered = await providedPassword.concat(
    process.env.PEPPER,
  );

  return await bcryptjs.compare(providedPasswordPeppered, storedPassword);
}

const password = {
  hash,
  compare,
};

export default password;
