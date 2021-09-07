import { Selector } from "testcafe";
import devices from "../devices.json";

fixture`ninja-rmm-tests`.page`http://localhost:3001`;

devices.forEach((device, i) => {
  test.skip("Test One", async (t) => {
    await t
      .expect(Selector(".device-name").withText(`${device.system_name}`).exists)
      .eql(true);

    await t
      .expect(Selector(".device-type").withText(`${device.type}`).exists)
      .eql(true);

    await t
      .expect(
        Selector(".device-capacity").withText(`${device.hdd_capacity}`).exists
      )
      .eql(true);

    await t.expect(Selector(".device-edit").nth(i).exists).eql(true);

    await t.expect(Selector(".device-remove").nth(i).exists).eql(true);
  });
});

test(`Test Two`, async (t) => {
  const deviceNameInput = Selector('input[name="system_name"]');
  const deviceCapacityInput = Selector('input[name="hdd_capacity"]');
  const deviceName = "TEST";
  const deviceCapacity = "999";

  await t
    .click(Selector(".submitButton"))
    .typeText(deviceNameInput, deviceName)
    .typeText(deviceCapacityInput, deviceCapacity);

  await t.click(Selector(".submitButton"));

  await t
    .expect(Selector(".device-name").withText(deviceName).exists)
    .eql(true);

  await t
    .expect(Selector(".device-capacity").withText(deviceCapacity).exists)
    .eql(true);
});
