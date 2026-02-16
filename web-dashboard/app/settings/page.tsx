import { createInstance, deleteInstance, getDevices, getInstances, linkDeviceToInstance, logoutInstance, provisionEvolutionInstance, unlinkDevice } from './actions';
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
            logoutInstance={logoutInstance}
            deleteInstance={deleteInstance}
        />
    );
}
