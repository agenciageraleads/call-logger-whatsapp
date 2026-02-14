import { createInstance, getDevices, getInstances, linkDeviceToInstance, provisionEvolutionInstance, unlinkDevice } from './actions';
import SettingsPageClient from './client-page';

export const dynamic = 'force-dynamic';

export default async function Page() {
    const instances = await getInstances();
    const devices = await getDevices();

    return (
        <SettingsPageClient
            initialInstances={instances}
            initialDevices={devices}
            createInstance={createInstance}
            linkDeviceToInstance={linkDeviceToInstance}
            provisionEvolutionInstance={provisionEvolutionInstance}
            unlinkDevice={unlinkDevice}
        />
    );
}
