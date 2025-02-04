local cam = nil

Spawn = {
    Choosing = true,
    InitCamera = function(self)
        TransitionToBlurred(500)
        DoScreenFadeOut(500)
        cam = CreateCamWithParams("DEFAULT_SCRIPTED_CAMERA", -590.5926, -26.55881, 284.9984, -10.0, 0.0, 25.81, 60.0, false, 0)
        SetCamActiveWithInterp(cam, true, 900, true, true)
        RenderScriptCams(true, false, 1, true, true)
        DisplayRadar(false)
    end,
    Init = function(self)
        local ped = PlayerPedId()
--        ShutdownLoadingScreenNui()
        while not HasCollisionLoadedAroundEntity(PlayerPedId()) do -- Added as a 'hotfix' for falling through the ground because collision wasn't loaded yet
            SetEntityCoords(ped, -783.09, 334.99, 188.0)
            Citizen.Wait(1)
        end
        FreezeEntityPosition(ped, true)
        SetEntityVisible(ped, false)
        DoScreenFadeIn(500)
        Citizen.Wait(500) -- Why the fuck does NUI just not do this without a wait here???
        SetNuiFocus(true, true)
        SendNUIMessage({ type = 'APP_SHOW' })
    end,
    SpawnToWorld = function(self, data, cb)
        DoScreenFadeOut(500)
        while not IsScreenFadedOut() do
            Citizen.Wait(10)
        end
    
        local player = PlayerPedId()
        SetTimecycleModifier('default')
    
        local model = `mp_f_freemode_01`
        if tonumber(data.Gender) == 0 then
            model = `mp_m_freemode_01`
        end
    
        RequestModel(model)
    
        while not HasModelLoaded(model) do
          Citizen.Wait(500)
        end
        SetPlayerModel(PlayerId(), model)
        player = PlayerPedId()
        SetPedDefaultComponentVariation(player)
        SetEntityAsMissionEntity(player, true, true)
        SetModelAsNoLongerNeeded(model)
    
        Citizen.Wait(300)

        DestroyAllCams(true)
        RenderScriptCams(false, true, 1, true, true)
        FreezeEntityPosition(player, false)
    
        NetworkSetEntityInvisibleToNetwork(player, false)
        SetEntityVisible(player, true)
        FreezeEntityPosition(player, false)
        cam = nil
    
        SetPlayerInvincible(PlayerId(), false)
        SetCanAttackFriendly(player, true, true)
        NetworkSetFriendlyFireOption(true)
        SetEntityCollision(player, true, true)
    
        SetEntityMaxHealth(PlayerPedId(), 200)
        SetEntityHealth(PlayerPedId(), data.HP > 100 and data.HP or 200)
        DisplayHud(true)
        
        if data.action ~= nil then
            TriggerEvent(data.action, data.data)
        else
            SetEntityCoords(player, data.spawn.location.x, data.spawn.location.y, data.spawn.location.z)
            DoScreenFadeIn(500)
        end

        SetFocusEntity(PlayerPedId())
        
        LocalPlayer.state.ped = player

        SetNuiFocus(false)
    
        TransitionFromBlurred(500)
        cb()
    end
}

AddEventHandler('Proxy:Shared:RegisterReady', function()
    exports['quantum-base']:RegisterComponent('Spawn', Spawn)
end)