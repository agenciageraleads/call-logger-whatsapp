import { createInstance, deleteInstance, getDevices, getInstances, linkDeviceToInstance, logoutInstance, provisionEvolutionInstance, unlinkDevice, checkInstanceConnectionState } from './actions';
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
            checkInstanceConnectionState={checkInstanceConnectionState}
            unlinkDevice={unlinkDevice}
            logoutInstance={logoutInstance}
            deleteInstance={deleteInstance}
        />
    );
}
